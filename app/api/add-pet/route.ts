import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const age = searchParams.get('age');
 
  try {
    if (!name || !age) throw new Error('Pet and owner names required');
    await sql`INSERT INTO Pets (Name, Age) VALUES (${name}, ${age}), ('mary', 7);`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM Pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}