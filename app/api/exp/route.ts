export async function GET() {
    const response = await fetch("https://dummyjson.com/users")
    const data = await response.json()
    // console.log(data)
    return Response.json(data)
}

export async function POST(req: Request) {
    const body = await req.json()
    const msg = body.msg
    return Response.json({msg: `${msg}`})
}