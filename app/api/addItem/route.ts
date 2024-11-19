import { db } from "@vercel/postgres"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const level = parseInt(formData.get("level") as string)
  const enchantment = parseInt(formData.get("enchantment") as string)
  const quantity = parseInt(formData.get("quantity") as string)
  const seller = formData.get("seller") as string
  const sale_start = formData.get("sale_start") as string
  const sale_end = formData.get("sale_end") as string
  const price = parseInt(formData.get("price") as string)
  const description = formData.get("description") as string


  const img = formData.get("img") as File
  const suffix = img.type.split("/")[1]
  const obj = await img.arrayBuffer()
  const bucketName = "fenwick-bazaar-bucket"
  const region = "ap-southeast-2"

  const s3_client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
    }
  })

  const s3_file_name = `${uuidv4()}.${suffix}`
  await s3_client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: s3_file_name,
      Body: Buffer.from(obj),
      ContentType: img.type
    }),
  )
  const imageURL = `https://${bucketName}.s3.${region}.amazonaws.com/${s3_file_name}`

  try {
    const client = await db.connect()
    await client.sql `insert into items (name, type, level,
            enchantment, quantity, seller, sale_start, sale_end,
            price, description, status, image_url) 
            values (${name}, ${type}, ${level}, ${enchantment}, ${quantity}, ${seller}, ${sale_start}, ${sale_end}, ${price}, ${description}, ${null}, ${imageURL})`
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, {status: 500})    
  }
  return NextResponse.json(imageURL, {status: 200})
}


// CREATE OR REPLACE FUNCTION update_item_status() 
// RETURNS TRIGGER AS $$
// BEGIN
//   -- Check if the current date is between sale_start and sale_end
//   IF CURRENT_DATE BETWEEN NEW.sale_start AND NEW.sale_end THEN
//     -- If current date is within the range, set status to 'listed'
//     NEW.status := 'listed';
//   ELSE
//     -- If current date is outside the range, set status to 'unlisted'
//     NEW.status := 'unlisted';
//   END IF;
  
//   -- Return the modified row
//   RETURN NEW;
// END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER status_trigger
// BEFORE INSERT OR UPDATE ON items
// FOR EACH ROW
// EXECUTE FUNCTION update_item_status();