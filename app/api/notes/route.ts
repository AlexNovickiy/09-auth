import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../api';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const cookieStore = await cookies();

  try {
    const response = await api.get('/notes', {
      params,
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

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const response = await api.post('/notes', data, {
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
