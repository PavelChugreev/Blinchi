import { BaseClient } from "./BaseClient";
import { IGetAllDiagramsResponce, IGetDiagramResponce } from "../shared/interfaces";

export class SwimlanesClient extends BaseClient {

  static getAllDiagrams() {
    return this.get<IGetAllDiagramsResponce>('api/v1/Diagrams');
  }
  
  static getDiagram(id: string) {
    return this.get<IGetDiagramResponce>(`api/v1/Diagrams/${id}`)
  }

  static addDiagram(text: string) {
    return this.post<any, IGetDiagramResponce>('api/v1/Diagrams', {
      type: "Swimlane",
      data: window.btoa(text),
      updatedBy: new Date()
    });
  }

  static updateDiagram(id: string, data: string) {
    return this.put(`api/v1/Diagrams/${id}`, {
      id,
      data: window.btoa(data),
      updatedBy: new Date()
    })
  }
}