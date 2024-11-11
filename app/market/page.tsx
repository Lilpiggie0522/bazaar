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
  App
} from "antd"

import enUS from "antd/lib/locale/en_US"
import { useState } from "react"
import Link from "next/link"
// import { useLocalStorageState } from "@/context/userContext";

function MarketPageComponent() {
  // const [userId, ] = useLocalStorageState("userId", "")
  const { message } = App.useApp()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  const ench = [{ value: "0", label: 0 }, { value: "1", label: 1 }, { value: "2", label: 2 }, { value: "3", label: 3 }, { value: "4", label: 4 }]
  const itemTypes = [{ value: "armor", label: "Armor" }, { value: "weapon", label: "Weapon" }, { value: "resources", label: "Resources" }, { value: "materials", label: "Materials" }]
  const itemLevels = [{ value: "0", label: 0 }, { value: "1", label: 1 }, { value: "2", label: 2 }, { value: "3", label: 3 }, { value: "4", label: 4 }, { value: "5", label: 5 }, { value: "6", label: 6 }, { value: "7", label: 7 }, { value: "8", label: 8 }]
  const cards = [
    { id: 1, title: "piggie bloodletter", description: "just a descrip" },
    { id: 2, title: "piggie bloodletter1", description: "" },
    { id: 3, title: "piggie bloodletter2", description: "just a descrip2" },
    { id: 5, title: "piggie bloodletter3", description: "just a descrip3" },
    { id: 9, title: "piggie bloodletter", description: "just a descrip" },
    { id: 18, title: "piggie bloodletter", description: "just a descrip" },
    { id: 22, title: "piggie bloodletter", description: "just a descrip" },
    { id: 77, title: "piggie bloodletter", description: "just a descrip" },
    { id: 311, title: "piggie bloodletter", description: "just a descrip" },
    { id: 19, title: "piggie bloodletter", description: "just a descrip" },
    { id: 666, title: "piggie bloodletter", description: "just a descrip" },
    { id: 56, title: "piggie bloodletter", description: "just a descrip" },
    { id: 37, title: "piggie bloodletter", description: "just a descrip" },
    { id: 82, title: "piggie bloodletter", description: "just a descrip" },
    { id: 67, title: "piggie bloodletter", description: "just a descrip" },
  ]

  const handlePageChange = (page: number) => {
    console.log("page is " + page)
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
    "quantity": number;
    "seller": string;
    "dateRange": DateRange
    "price": number;
    "upload": File;
    "description"?: string
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
      "upload": upload,
      "description": description   // optional
    } = form

    const formData = {
      "name": itemName,
      "type": itemType,
      "level": parseInt(itemLevel),
      "enchantment": parseInt(enchantment),
      "quantity": quantity,
      "seller": seller,
      "dateRange": dateRange,
      "price": price,
      "upload": upload,
      "description": description
    }
    console.log(formData)

    const response: Response = await fetch("/api/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const error = await response.json()
      message.error(`${error.name}, code: ${error.code}`)
      return
    }
    message.success("Item listed")
  }

  const paginatedCards = cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className='m-3 min-h-screen'>
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
                label="Item Price"
                name="price"
                customSymbol="💰"
                rules={[{ required: true, message: "Item must have a price" }]}
              />
            </ProFormGroup>

            <ProForm.Group>
              <ProFormUploadButton
                width='lg'
                title="Upload item picture"
                name="upload"
                label="Upload"
                max={2}
                fieldProps={{
                  name: "image",
                }}
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
      <div className='mt-10'>
        <List
          grid={{ gutter: 32, column: 4 }}
          dataSource={paginatedCards}
          renderItem={(item) => (
            <List.Item>
              <Link key={item.id} href={`/market/${item.id}`}>
                <Card title={item.title}>
                  <Image
                    width={150}
                    height={150}
                    src="/gg.png"
                    fallback="data:image/png;base64,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"
                    preview={true}
                    alt='placeholder'
                  />
                  {item.description &&
                    <div>
                      Item Description: {item.description}
                    </div>}
                  <div>
                    itemID: {item.id}
                  </div>
                </Card>
              </Link>
            </List.Item>
          )}
        />
        <div className='flex justify-center'>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={cards.length}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "center" }}
          />
        </div>
      </div>
    </div>
  )
}
export default function MarketPage() {
  return <App>
    <MarketPageComponent />
  </App>
}