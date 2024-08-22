import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

// Route for fetching user profile data after a google auth
export async function POST(request: Request) {
  try {
    const { token } = await verifySession();
    const body = await request.json();
    const { folderID } = body;
    const response = await api.post(
      `hierarchy/file_hierarchy_suggestion`,
      { folderID },
      {
        headers: {
          Authorization: `Bearer ${token + process.env.MAGIC_SPLITTER + process.env.SECRET_CODE}`,
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
