import { createSession } from '@/src/lib/session';
import api from '@/src/utils/axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;
    const authRes = await api.post('auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    if (!authRes.data.success) {
      return new Response(JSON.stringify({ message: 'Invalid credentials', success: false }), {
        status: 400,
        headers: {},
      });
    }

    await createSession(authRes.data.user, authRes.data.token);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully registered',
        user: authRes.data.user,
      }),
      {
        status: 200,
        headers: {},
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error, success: false }), {
      status: 400,
      headers: {},
    });
  }
}
