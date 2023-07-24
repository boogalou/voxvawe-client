import { ChangeEvent, useState } from 'react';

export interface UseSelectedUploadFiles {
  fileList: FileList | null;
  previews: string[];
  handleFileSelect: (evt: ChangeEvent<HTMLInputElement>) => void;
  clearSelectedFiles: () => void;
}

export const useSelectedUploadFiles = (handleOpenModal: () => void): UseSelectedUploadFiles => {
  const [fileList, setFilesList] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = evt.target.files!;
    if (selectedFiles) {
      setFilesList(selectedFiles);


      const previewList: string[] = [];

      Array.from(selectedFiles).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => {
            if (e.target && typeof e.target.result === 'string') {
              previewList.push(e.target.result);
              setPreviews(previewList);
            }
          };
          reader.readAsDataURL(file);
        }
      });
      handleOpenModal();
    }
  };

  const clearSelectedFiles = () => {
    setFilesList(null);
    setPreviews([]);
  };



  return { fileList, previews, handleFileSelect, clearSelectedFiles };
};
