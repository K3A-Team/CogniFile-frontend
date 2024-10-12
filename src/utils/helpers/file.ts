import { FolderResponse } from '@/src/types/responses';

export const transformResponse = (res: FolderResponse) => {
  const { folder } = res;

  const filespart = folder.files.map(file => ({
    id: file.id,
    name: file.name,
    size: file.size,
    date: 'Unknown',
    url: file.url,
  }));

  const folderspart = folder.subFolders.map(subFolder => ({
    id: subFolder.id,
    name: subFolder.name,
    items: subFolder.children,
    size: 'Unknown',
    color: 'blue',
    date: 'Unknown',
  }));

  return { folderspart, filespart };
};
