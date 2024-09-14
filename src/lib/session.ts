import { User } from '../types/shared';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import 'server-only';

export async function createSession(user: User, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = {
    user,
    token,
  };

  cookies().set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const session = JSON.parse(cookies().get('session')?.value || '');

  if (!session || !session.token) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession() {
  const session = JSON.parse(cookies().get('session')?.value || '{}');
  if (!session || !session.token) {
    redirect('/auth/login');
  } else {
    return session;
  }
}

export const getSession = () : Record<string, string> | null => {
  const session = JSON.parse(cookies().get('session')?.value || '{}');
  return (Object.keys(session).length === 0) ? null : session;
}

export function deleteSession() {
  cookies().delete('session');
}
