import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

export async function POST(request: Request) {
  try {
    const { token } = await verifySession();
    const formData = await request.formData();
    const email = formData.get('userEmail') as string;
    const storageId = formData.get('workspaceId') as string;
    const response = await api.post(
      `/storage/shared/${storageId}/member`,
      { userEmail: email },
      {
        headers: {
          Authorization: `Bearer ${token + process.env.MAGIC_SPLITTER + process.env.SECRET_CODE}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.data.success) {
      return new Response(
        JSON.stringify({
          message: response.data.message,
        }),
        {
          status: 400,
          headers: {},
        },
      );
    }
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {},
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error,
      }),
      {
        status: 400,
        headers: {},
      },
    );
  }
}
