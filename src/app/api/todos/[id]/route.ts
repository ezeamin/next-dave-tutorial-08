import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params: { id } }: Props) {
  // const id = request.url.slice(request.url.lastIndexOf('/') + 1);

  const response = await fetch(`${DATA_SOURCE_URL}/${id}`);
  const data: Todo = await response.json();

  if (!response.ok || !data.id)
    return NextResponse.json({ message: `Error: Todo ${id} NOT found` });

  return NextResponse.json(data);
}
