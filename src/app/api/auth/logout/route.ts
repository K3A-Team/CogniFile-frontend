import { deleteSession } from '@/src/lib/session';

export async function POST() {
  try {
    await deleteSession();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully logged out',
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
