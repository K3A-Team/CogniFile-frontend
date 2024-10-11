import TrashPage from '../../../../components/storage/trashpage';
import { verifySession } from '@/src/lib/session';

const Trash = async () => {
  const session = await verifySession();

  const { user } = session;
  return (
    <>
      <TrashPage folderId={user.trashFolderId} />
    </>
  );
};

export default Trash;
