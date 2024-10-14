import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

// Route for uploading folder data
export async function POST(request: Request) {
  try {
    const { token } = await verifySession();
    const formData = await request.formData();
    const folderId = formData.get('folderId') as string;

    formData.delete('folderId'); // Remove folderId from formData

    if (!folderId) {
      throw new Error('FolderId missing');
    }

    // Perform the folder upload using the /storage/folder/{folderId}/uploadFolder endpoint
    const response = await api.post(`/storage/folder/${folderId}/uploadFolder`, formData, {
      headers: {
        Authorization: `Bearer ${token + process.env.MAGIC_SPLITTER + process.env.SECRET_CODE}`,
        'Content-Type': 'multipart/form-data',
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
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      {
        status: 400,
        headers: {},
      },
    );
  }
}
