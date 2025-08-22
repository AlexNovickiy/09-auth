import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User, UserMe } from '@/types/note';

export async function getServerMe() {
  const cookieStore = await cookies();
  const response = await nextServer.get<UserMe>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function updateServerMe(user: User) {
  const cookieStore = await cookies();
  const response = await nextServer.patch<UserMe>('/users/me', user, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}
