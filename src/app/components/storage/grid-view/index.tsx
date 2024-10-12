import FileCard from '../../core/filecard';
import FolderCard from '../../core/foldercard';
import { Folder, File } from '@/src/types/shared';

type GridViewProps = {
  folders: Folder[];
  files: File[];
  onNavigate: (folderId: string) => void;
  onDownload: (url: string, fileName: string) => void;
  onRemoveFolder?: (id: string) => void;
  onRemoveFile?: (id: string) => void;
};

const GridView = ({
  folders,
  files,
  onNavigate,
  onDownload,
  onRemoveFolder,
  onRemoveFile,
}: GridViewProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
    {folders.map(folder => (
      <button
        key={folder.id}
        onClick={() => folder.id && onNavigate(folder.id)}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            folder.id && onNavigate(folder.id);
          }
        }}
      >
        <FolderCard
          color={folder.color}
          name={folder.name}
          items={folder.items}
          size={folder.size}
          onRemove={() => folder.id !== undefined && onRemoveFolder && onRemoveFolder(folder.id)}
        />
      </button>
    ))}
    {files.map(file => (
      <div
        key={file.id}
        onClick={() => file.url && file.name && onDownload(file.url, file.name)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (file.url && file.name) {
              onDownload(file.url, file.name);
            }
          }
        }}
      >
        <FileCard
          fileName={file.name}
          fileSize={file.size}
          animateIn
          customAnimation="animate-fade-in-up"
          onRemove={() => file.id !== undefined && onRemoveFile && onRemoveFile(file.id)}
        />
      </div>
    ))}
  </div>
);

export default GridView;
