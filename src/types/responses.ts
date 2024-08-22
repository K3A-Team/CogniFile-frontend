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

export type FolderHierarchy = {
  name: string;
  children: Folder[]; // Recursive type to handle nested folders
  files: File[]; // List of files in the folder
};
