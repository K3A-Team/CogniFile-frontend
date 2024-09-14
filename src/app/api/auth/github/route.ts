import { baseURL } from '@/src/utils/axios';
import { redirect } from 'next/navigation';

export async function GET() {
  const githubAuthUrl = `${baseURL}auth/github`;
  redirect(githubAuthUrl);
}
