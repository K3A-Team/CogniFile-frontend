import { baseURL } from '@/src/utils/axios';
import { redirect } from 'next/navigation';

export async function GET() {
  const googleAuthUrl = `${baseURL}/auth/google`;
  redirect(googleAuthUrl);
}
