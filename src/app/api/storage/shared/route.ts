import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

// Route for fetching user profile data after a google auth
export async function GET() {
  try {
    const { token } = await verifySession();
    const response = await api.get(`storage/shared/`, {
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

// Route for creating a new shared storage
export async function POST(request: Request) {
  try {
    const { token } = await verifySession();
    const formData = await request.formData();
    const body = {
      storageName: formData.get('name') as string,
      image: formData.get('image') as File,
    };

    const response = await api.post(
      `/storage/shared/?storageName=${body.storageName}`,
      {
        image: body.image,
      },
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
