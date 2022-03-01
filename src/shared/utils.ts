export const getFullDate = (date: Date): string => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);

  return `${day}/${month}/${date.getFullYear()}`;
}

export const addZero = (date: string | number): string => {
  const d = date.toString();
  return d.length < 2 ? `0${d}` : d;
}