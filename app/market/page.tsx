"use client"
import { Button } from "@mui/material"
import { PlusOutlined } from "@ant-design/icons"
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components"
import {
  ConfigProvider,
  Card,
  List,
  Image,
  Pagination,
  App,
  UploadFile
} from "antd"

import enUS from "antd/lib/locale/en_US"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Item } from "./[id]/page"
import { UploadChangeParam } from "antd/es/upload"

function MarketPageComponent() {
  const { message } = App.useApp()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  const ench = [{ value: "0", label: 0 }, { value: "1", label: 1 }, { value: "2", label: 2 }, { value: "3", label: 3 }, { value: "4", label: 4 }]
  const itemTypes = [{ value: "armor", label: "Armor" }, { value: "weapon", label: "Weapon" }, { value: "resources", label: "Resources" }, { value: "materials", label: "Materials" }, { value: "consumables", label: "Consumables" }]
  const itemLevels = [{ value: "0", label: 0 }, { value: "1", label: 1 }, { value: "2", label: 2 }, { value: "3", label: 3 }, { value: "4", label: 4 }, { value: "5", label: 5 }, { value: "6", label: 6 }, { value: "7", label: 7 }, { value: "8", label: 8 }]
  const [cards, setCards] = useState<Item[]>([])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  enum ItemTypes {
    Armor = "armor",
    Weapon = "weapon",
    Resources = "resources",
    Materials = "materials"
  }

  enum EnchantLevels {
    Level0 = "0",
    Level1 = "1",
    Level2 = "2",
    Level3 = "3",
    Level4 = "4"
  }

  enum ItemLevels {
    Level0 = "0",
    Level1 = "1",
    Level2 = "2",
    Level3 = "3",
    Level4 = "4",
    Level5 = "5",
    Level6 = "6",
    Level7 = "7",
    Level8 = "8"
  }

  type DateRange = [string, string];

  interface formValues {
    "item name": string;
    "item type": ItemTypes;
    "item level": ItemLevels;
    "enchantment": EnchantLevels;
    "quantity": string;
    "seller": string;
    "dateRange": DateRange
    "price": string;
    "upload": UploadFile[];
    "description": string
  }

  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("/api/getItems", {
          method: "GET",
          cache: "no-store"
        })
        const cards = await response.json()
        setCards(cards)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCards()
  }, [])

  function handleOnChange(info: UploadChangeParam) {
    setFile(info.fileList[0].originFileObj as File)
  }

  async function handleOnSubmit(form: formValues) {
    const {
      "item name": itemName,
      "item type": itemType,
      "item level": itemLevel,
      "enchantment": enchantment,
      "quantity": quantity,
      "seller": seller,
      "dateRange": dateRange,
      "price": price,
      "description": description
    } = form

    const formData = new FormData()
    formData.append("name", itemName)
    formData.append("type", itemType)
    formData.append("level", itemLevel)
    formData.append("enchantment", enchantment)
    formData.append("quantity", quantity)
    formData.append("seller", seller)
    formData.append("sale_start", dateRange[0])
    formData.append("sale_end", dateRange[1])
    formData.append("price", price)
    formData.append("description", description)
    if (file) {
      formData.append("img", file)
    }
    
    const response: Response = await fetch("/api/addItem", {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      message.error(`${error.name}, code: ${error.code}`)
      return
    }
    const link = await response.json()
    console.log(link)
    message.success("Item listed")
    window.location.reload()
  }

  const paginatedCards = cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className='min-h-screen flex flex-col m-2'>
      <div>
        <ConfigProvider locale={enUS}>
          <ModalForm
            title="New Item"
            trigger={
              <Button variant='contained' color='success' sx={{ textTransform: "none", fontFamily: "sans-serif", fontWeight: 600 }} className='space-x-1'>
                <PlusOutlined />
                <p>Sell Item</p>
              </Button>
            }
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log("Canceled"),
            }}
            onFinish={async (values: formValues) => {
              // console.log(values)
              handleOnSubmit(values)
              return true
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="xl"
                name="item name"
                label="Item Name"
                tooltip="Name of item only, such as Avalonian Fist or Bloodletter"
                placeholder="Please enter item name"
                rules={[{ required: true, message: "Item name cannot be empty" }]}
              />

              <ProFormSelect
                request={async () => itemTypes}
                width="xl"
                name="item type"
                label="Item Type"
                tooltip='Please select item type'
                placeholder='Please select item type'
                rules={[{ required: true, message: "Please select item type" }]}
              />

              <ProFormSelect
                request={async () => itemLevels}
                width="xl"
                name="item level"
                label="Item Level"
                tooltip='Please select item level'
                placeholder='Please select item level'
                rules={[{ required: true, message: "Please select item level" }]}
              />

              <ProFormSelect
                request={async () => ench}
                width="lg"
                name="enchantment"
                label="Enchantment Level"
                placeholder='Please select item enchantment level'
                tooltip='Please select enchantment level'
                rules={[{ required: true, message: "Please select enchantment level" }]}
              />

              <ProFormDigit
                width='lg'
                name='quantity'
                label='Item Quantity'
                placeholder='Please enter item quantity'
                rules={[{ required: true, message: "Please enter item quantity" }]}
                initialValue={1}
                min={1} />
            </ProForm.Group>

            <ProFormGroup>
              <ProFormText
                width="xl"
                name="seller"
                label="Seller name"
                tooltip="Enter seller's in-game name"
                placeholder="Please enter seller's in-game name"
                rules={[{ required: true, message: "seller name cannot be empty" }]}
              />
            </ProFormGroup>

            <ProForm.Group>
              <ProFormDateRangePicker
                name="dateRange"
                label="Sale Period"
                rules={[{ required: true, message: "Please enter sale period" }]}
                fieldProps={{ placeholder: ["Start date", "End date"] }}
              />
            </ProForm.Group>

            <ProFormGroup>
              <ProFormMoney
                label="Unit price"
                name="price"
                customSymbol="💰"
                min={1}
                rules={[{ required: true, message: "Item must have a price" }]}
              />
            </ProFormGroup>

            <ProForm.Group>
              <ProFormUploadButton
                width='lg'
                title="Upload item picture"
                name="upload"
                label="Upload"
                max={1}
                fieldProps={{
                  name: "image",
                }}
                onChange={handleOnChange}
              />
            </ProForm.Group>
            <ProFormTextArea
              colProps={{ span: 24 }}
              name="description"
              label="Item description"
              tooltip="Enter a description"
              placeholder="Enter item description"
            />
            <ProForm.Group>

            </ProForm.Group>
          </ModalForm>
        </ConfigProvider>
      </div>
      <div className="pt-2">
        <List
          grid={{ gutter: 32, column: 4 }}
          dataSource={paginatedCards}
          renderItem={(item) => (
            <List.Item>
              <Link key={item.id} href={`/market/${item.id}`}>
                <Card title={item.name} className="font-sans">
                  <Image
                    width={150}
                    height={150}
                    src={item.image_url}
                    fallback="/placeholder.png"
                    preview={false}
                    alt='placeholder'
                  />
                  <div>
                      Unit Price: {item.price}
                  </div>
                  <div>
                      Level: {item.level}
                  </div>
                  <div>
                      Item Description: {item.description}
                  </div>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </div>
      <div className='bottom-0 absolute'>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={cards.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}
export default function MarketPage() {
  return <App>
    <MarketPageComponent />
  </App>
}