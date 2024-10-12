import TrashView from '../../../../components/storage/trash/main-view';
import { verifySession } from '@/src/lib/session';

const Trash = async () => {
  const session = await verifySession();
  const { user } = session;

  return <TrashView folderId={user.trashFolderId} />;
};

export default Trash;
