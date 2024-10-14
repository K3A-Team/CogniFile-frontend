import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

// Route for fetching user profile data after a google auth
export async function POST(request: Request) {
  try {
    const { token } = await verifySession();
    const formData = await request.formData();
    const folderId = formData.get('folderId') as string;

    formData.delete('folderId');

    if (!folderId) {
      throw new Error('folderId missing');
    }

    const response = await api.post(`/storage/folder/${folderId}/uploadFolder`, formData, {
      headers: {
        Authorization: `Bearer ${token + process.env.MAGIC_SPLITTER + process.env.SECRET_CODE}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) {
      return new Response(
        JSON.stringify({
          message: 'An issue occurred while uploading the folder',
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
        message: `${error}`,
      }),
      {
        status: 400,
        headers: {},
      },
    );
  }
}
