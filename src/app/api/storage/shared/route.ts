// File: app/api/storage/shared/route.ts
import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

export async function GET() {
  try {
    const { token } = await verifySession();
    const response = await api.get(`storage/shared`, {
      headers: {
        Authorization: `Bearer ${token}${process.env.MAGIC_SPLITTER}${process.env.SECRET_CODE}`,
      },
    });

    if (!response.data.success) {
      return new Response(
        JSON.stringify({
          message: response.data.message,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
