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