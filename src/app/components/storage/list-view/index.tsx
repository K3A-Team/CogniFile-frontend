import FileRow from '../../core/filerow';
import FolderRow from '../../core/folderrow';
import Link from 'next/link';
import { Folder, File } from '@/src/types/shared';

type ListViewProps = {
  folders: Folder[];
  files: File[];
  onNavigate: (folderId: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const ListView = ({ folders, files, onNavigate }: ListViewProps) => (
  <div className="w-full">
    <table className="table-auto w-full text-left">
      <tbody className="space-y-2 w-full">
        {folders.map(folder => (
          <Link key={folder.id} href={`/storage/${folder.id}`} className="w-full justify-between">
            <FolderRow
              color={folder.color}
              name={folder.name}
              items={folder.items}
              size={folder.size}
              date={folder.date}
            />
          </Link>
        ))}
        {files.map(file => (
          <FileRow key={file.id} name={file.name} size={file.size} date={file.date} />
        ))}
      </tbody>
    </table>
  </div>
);

export default ListView;
