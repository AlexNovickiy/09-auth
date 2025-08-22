import { cookies } from 'next/headers';
import { api, ApiError } from '../../api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  try {
    const response = await api.get('/users/me', {
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

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const body = await request.json();
  try {
    const response = await api.post('/users/me', body, {
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
