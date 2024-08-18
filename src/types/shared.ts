export type Folder = {
  id: number | undefined;
  name: string;
  items: number;
  size: string;
  color: string;
  date: string;
};
export type File = {
  id: number | undefined;
  name: string;
  size: string;
  date: string;
};

export type User = {
  lastName: string;
  firstName: string;
  rootFolderId: string;
  trial: string;
  chatbotSessionId: string;
  email: string;
  usedSpace: string;
};
