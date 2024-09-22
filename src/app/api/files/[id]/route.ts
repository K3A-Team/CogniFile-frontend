import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

// Route for deleting a file
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { token } = await verifySession();
    const response = await api.delete(`storage/file/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token + process.env.MAGIC_SPLITTER + process.env.SECRET_CODE}`,
      },
    });

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
