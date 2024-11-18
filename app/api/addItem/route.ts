import { db } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const name: string = body.name
  const type: string = body.type
  const level: number = body.level
  const enchantment: number = body.enchantment
  const quantity: number = body.quantity
  const seller: string = body.seller
  const sale_start: string = body.dateRange[0]
  const sale_end: string = body.dateRange[1]
  const price: number = body.price
  const upload: string = body.upload
  const description: string = body.description
  try {
    const client = await db.connect()
    await client.sql `insert into items (name, type, level,
            enchantment, quantity, seller, sale_start, sale_end,
            price, description, status, image_url) 
            values (${name}, ${type}, ${level}, ${enchantment}, ${quantity}, ${seller}, ${sale_start}, ${sale_end}, ${price}, ${description}, ${null}, ${upload})`
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, {status: 500})    
  }
  return NextResponse.json(body, {status: 200})
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