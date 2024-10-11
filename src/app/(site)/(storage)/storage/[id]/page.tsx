import MyPage from '@/src/app/components/storage/mypage';
import { verifySession } from '@/src/lib/session';

const MyStorage = async ({ params }: { params: { id: string } }) => {
  const session = await verifySession();
  const { user } = session;

  const idToUse = params.id || user.rootFolderId;

  return (
    <>
      <MyPage folderId={idToUse} />
    </>
  );
};

export default MyStorage;
