import api from '@/src/utils/axios';

export const fetchBreadcrumbs = async (initialFolderId: string) => {
  const items = [];
  let currentFolderId = initialFolderId;
  let currentFolder = null;

  while (currentFolderId) {
    const res = await api.post(`/api/folders`, { folderId: currentFolderId });
    currentFolder = res.data.folder;

    items.unshift({
      folderId: currentFolder.id,
      folderName: currentFolder.parent ? currentFolder.name : 'My Storage',
    });

    currentFolderId = currentFolder.parent ? currentFolder.parent.id : null;
  }
  return items;
};

export const fetchFolderContent = async (folderId: string) => {
  const res = await api.post(`/api/folders`, { folderId });
  return res;
};

export const fetchRecentFiles = async () => {
  const response = await api.get('/api/storage/recent');
  const { result } = response.data;
  return result;
};

export const removeFile = async (id: string) => {
  await api.delete(`/api/files/${id}`);
};

export const removeFolder = async (id: string) => {
  await api.delete(`/api/folders/${id}`);
};

export const createFolder = async (formData: FormData) => {
  const response = await fetch('/api/folders/create', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Folder creation failed');
  }

  const result = await response.json();

  return result;
};

export const uploadFile = async (formData: FormData) => {
  const response = await fetch('/api/files/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return response
      .clone()
      .json()
      .then(data => {
        throw new Error(data.message);
      });
  }

  const result = await response.json();

  return result;
};
