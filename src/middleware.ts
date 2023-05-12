import { NextResponse } from 'next/server';

// every request goes through here, even frontend req
export const middleware = (request: Request) => {
     console.log("Middleware!")

     console.log(request)

     const origin = request.headers.get('origin')
     console.log(origin)

     return NextResponse.next()
};
