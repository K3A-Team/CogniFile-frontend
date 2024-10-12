import { redirect } from 'next/navigation';
import { verifySession } from '@/src/lib/session';

const MyStorage = async () => {
  const session = await verifySession();

  const { user } = session;
  redirect(`/storage/${user.rootFolderId}`);
};

export default MyStorage;
