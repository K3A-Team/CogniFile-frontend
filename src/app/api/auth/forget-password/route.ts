import api from '@/src/utils/axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const forgetRes = await api.post('auth/forget-password', {
      email
    });

    if (!forgetRes.data.success) {
      return new Response(JSON.stringify({ message: forgetRes?.data?.message ?? "Something went wrong, try again later!", success: false }), {
        status: 400,
        headers: {},
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: forgetRes?.data?.message ?? "Password reset link sent to your email",
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
