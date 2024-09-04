import api from '@/src/utils/axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resetRes = await api.post('auth/reset-password', {
      ...body
    });

    if (!resetRes.data.success) {
      return new Response(JSON.stringify({ message: resetRes?.data?.message ?? "Something went wrong, try again later!", success: false }), {
        status: 400,
        headers: {},
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: resetRes?.data?.message ?? "Password updated successfully, you will be redirected to login page",
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
