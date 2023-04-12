import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY = process.env.DATA_API_KEY as string;

const headers = {
  'Content-Type': 'application/json',
  'API-Key': API_KEY,
};

export async function GET() {
  const response = await fetch(DATA_SOURCE_URL);
  const data: Todo[] = await response.json();

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id) return NextResponse.json({ message: 'Todo id required' });

  const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok)
    return NextResponse.json({ message: `Error: Todo ${id} NOT deleted` });

  return NextResponse.json({ message: `Todo ${id} deleted` });
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();

  if (!userId || !title)
    return NextResponse.json({ message: 'Missing required data' });

  const response = await fetch(DATA_SOURCE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ userId, title, completed: false }),
  });

  if (!response.ok)
    return NextResponse.json({ message: `Error: Todo NOT created` });

  const data: Todo = await response.json();

  return NextResponse.json({ message: `Todo created`, data });
}

export async function PUT(request: Request) {
  const { id, userId, title, completed }: Todo = await request.json();

  if (!userId || !title || !id || completed === undefined)
    return NextResponse.json({ message: 'Missing required data' });

  const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ userId, title, completed }),
  });

  if (!response.ok)
    return NextResponse.json({ message: `Error: Todo NOT updated` });

  const data: Todo = await response.json();

  return NextResponse.json({ message: `Todo updated`, data });
}
