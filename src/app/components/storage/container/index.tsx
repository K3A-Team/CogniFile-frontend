import EmptyState from '../empty-state';
import GridView from '../grid-view';
import ListView from '../list-view';
import { Folder, File } from '@/src/types/shared';

type FolderFileDisplayProps = {
  isListView: boolean;
  isEmpty: boolean;
  folders: Folder[];
  files: File[];
  onNavigate: (folderId: string) => void;
  onDownload: (url: string, fileName: string) => void;
  onRemoveFolder?: (id: string) => void;
  onRemoveFile?: (id: string) => void;
};

const StorageContainer = ({
  isListView,
  isEmpty,
  folders,
  files,
  onNavigate,
  onDownload,
  onRemoveFolder,
  onRemoveFile,
}: FolderFileDisplayProps) => {
  if (isEmpty) {
    return <EmptyState />;
  }

  return (
    <>
      {isListView ? (
        <ListView folders={folders} files={files} onNavigate={onNavigate} />
      ) : (
        <GridView
          folders={folders}
          files={files}
          onNavigate={onNavigate}
          onDownload={onDownload}
          onRemoveFolder={onRemoveFolder}
          onRemoveFile={onRemoveFile}
        />
      )}
    </>
  );
};

export default StorageContainer;
