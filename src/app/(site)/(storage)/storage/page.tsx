import MyPage from '../../../components/storage/mypage';
import { verifySession } from '@/src/lib/session';

const MyStorage = async () => {
  const session = await verifySession();

  const { user } = session;
  return (
    <>
      <MyPage folderId={user.rootFolderId} />
    </>
  );
};

export default MyStorage;
