import { createSession } from '@/src/lib/session';
import { redirect } from 'next/navigation';
import api from '@/src/utils/axios';
import 'server-only';

export async function GET(request: Request) {
  
  let errorMsg = '';
  let toRedirect = '/home';

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (!!error) {
      throw new Error(error);
    }

    const sessionRes = await api.get('auth/oauth/'+token);

    if (!sessionRes.data.success) {
      return new Response(JSON.stringify({ message: 'Invalid credentials', success: false }), {
        status: 400,
        headers: {},
      });
    }

    await createSession(sessionRes.data.user, sessionRes.data.token);
    
    //eslint-disable-next-line
  } catch (error: Error | any) {
    toRedirect = '/auth/login';
    errorMsg = error?.message ?? 'Something went wrong, try again later!';
  }
  redirect(
    toRedirect +
      (errorMsg ? '?error=' + encodeURIComponent(errorMsg) : ''),
  );
}
