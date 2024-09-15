import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const name: string = body.name;
    const type: string = body.type;
    const enchantment: number = body.enchantment;
    const quantity: number = body.quantity;
    const seller: string = body.seller;
    const sale_start: string = body.dateRange[0]
    const sale_end: string = body.dateRange[1]
    const price: number = body.price;
    const upload: string = body.upload;
    const description: string = body.description;
    let res = null;
    try {
        res = await sql `insert into items (name, type,
            enchantment, quantity, seller, 
            seller_id, sale_start, sale_end,
            price, description, status, image_url) 
            values (${name}, ${type}, ${enchantment}, ${quantity}, ${seller}, ${null}, ${sale_start}, ${sale_end}, ${price}, ${description}, ${null}, ${upload})`;
    } catch (error) {
        return NextResponse.json(error, {status: 500});    
    }
    console.log(res)
    return NextResponse.json(body, {status: 200});
}

/* 
database trigger function
create or replace function update_item_status() returns trigger as $$
begin
    if current_date >= sale_start and current_date <= sale_end then
        new.status := 'listed';
    else
        new.status := 'unlisted';
    end if;
    return new;
end;
$$ lanuage plpgsql;

database trigger
create or replace trigger set_item_status 
before insert or update on items 
for each row 
execute function update_item_status();
*/