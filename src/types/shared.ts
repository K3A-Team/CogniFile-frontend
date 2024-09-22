export type Folder = {
  id: string | undefined;
  name: string;
  items: number;
  size: string;
  color: string;
  date: string;
};
export type File = {
  id: string | undefined;
  name: string;
  size: string;
  date: string;
  url: string | undefined;
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
