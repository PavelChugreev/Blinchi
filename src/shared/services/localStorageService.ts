import { IGraph } from "../interfaces"

export class LocalStorageService {
  static get(name: string): IGraph[] | null {
    const graphs = localStorage.getItem(name);
    if (!graphs) {
      return null;
    }
    return JSON.parse(graphs);
  }

  static set(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}