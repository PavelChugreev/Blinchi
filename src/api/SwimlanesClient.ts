import { mockResponse } from "../shared/initials";
import { BaseClient } from "./BaseClient";
import { v4 } from 'uuid';

interface IRes {
  id: string;
  text: string
}

// TODO  refactor methods after API is completed
export class SwimlanesClient extends BaseClient {
  
  static getDiagram(id: string) {
    console.log('GET: ', id)
    return new Promise<IRes>((resolve, reject) => {
      setTimeout(() => {
        if (!id) {
          reject('id is required');
          return;
        }
        resolve({ id, text: mockResponse[id] })
      }, 2000);
    })
  }

  static saveDiagram(text: string) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (text === null || text === undefined) {
          reject('text is required');
          return;
        }
        resolve({ id: v4(), text: mockResponse[3] })
      }, 2000);
    })
  }

  static updateDiagram(id: string = '', text: string) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(!id){
          reject('id is required');
          return;
        }
        if (text === null || text === undefined) {
          reject('text is required');
          return;
        }
        resolve({ text })
      }, 2000);
    })
  }
}