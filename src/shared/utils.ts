import html2canvas from 'html2canvas';

export const getFullDate = (date: Date): string => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);

  return `${day}/${month}/${date.getFullYear()}`;
}

export const getTime = (date: Date): string => {
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  
  return `${hours}:${minutes}`
}

export const addZero = (date: string | number): string => {
  const d = date.toString();
  return d.length < 2 ? `0${d}` : d;
}

export const exportAsImage = async (el, imageFileName) => {
  const canvas = await html2canvas(el);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
}

export const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.hidden = true;
  fakeLink.download = fileName;
  
  fakeLink.href = blob;
  
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  
  fakeLink.remove();
};
