import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const response = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();

  try {
    const response = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}
