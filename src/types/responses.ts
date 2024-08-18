type File = {
  name: string;
  size: string;
  url: string;
};

type SubFolder = {
  name: string;
  children: number;
  id: string;
};

type Folder = {
  writeId: string[]; // Assuming these are arrays of strings, adjust if necessary
  readId: string[];
  id: string;
  ownerId: string;
  parent: string | null; // Can be null
  files: File[];
  subFolders: SubFolder[];
  name: string;
};

export type FolderResponse = {
  success: boolean;
  folder: Folder;
};
