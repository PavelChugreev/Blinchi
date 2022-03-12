export class LocalStorageService {
  static get(name: string) {
    const data = localStorage.getItem(name);

    return data ? JSON.parse(data) : null;
  }

  static set(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}