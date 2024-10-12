import Main from '@/src/app/components/storage/main-view';
import { verifySession } from '@/src/lib/session';

const MyStorage = async ({ params }: { params: { id: string } }) => {
  const session = await verifySession();
  const { user } = session;

  const idToUse = params.id || user.rootFolderId;

  return (
    <>
      <Main folderId={idToUse} />
    </>
  );
};

export default MyStorage;
