export const getFormData = (file: File | FileList | Blob) => {
  console.log(file);
  const formData = new FormData();

  if (file instanceof Blob ) {
    formData.append('file', file)
  }

  if (file instanceof File) {
    formData.append('file', file)
  }
  
  if (file instanceof FileList) {
    Array.from(file).forEach(item => {
      formData.append('file', item);
    })
  }

  return formData;
}