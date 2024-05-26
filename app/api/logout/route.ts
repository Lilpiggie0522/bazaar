import { logoutJwt } from '@/lib';
import { NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
    return await logoutJwt(req)
}