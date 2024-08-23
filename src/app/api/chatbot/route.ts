import { verifySession } from '@/src/lib/session';
import api from '@/src/utils/axios';

export async function POST(request: Request) {
  try {
    const { token } = await verifySession();
    const question = await request.json();

    if (!question) {
      throw new Error('question missing');
    }

    const response = await api.post(`/chatbot/chatbot`, question, {
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

export async function DELETE() {
  try {
    const { token } = await verifySession();

    const response = await api.delete(`/chatbot/clear`, {
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
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      {
        status: 400,
        headers: {},
      },
    );
  }
}
