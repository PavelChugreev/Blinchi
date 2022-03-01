import { BaseClient } from "./BaseClient";
import { IDiagramRequest, IGetAllDiagramsResponce, IGetDiagramResponce } from "../shared/interfaces";
import { diagramTypes, updatedByType } from "../shared/enums/diagrams-types";

export class SwimlanesClient extends BaseClient {

  static getAllDiagrams(config?) {
    return this.get<IGetAllDiagramsResponce>('api/v1/Diagrams?', {
      ...config,
      params: {
        SortBy: 'updatedat_desc'
      }
    });
  }
  
  static getDiagram(id: string) {
    return this.get<IGetDiagramResponce>(`api/v1/Diagrams/${id}`)
  }

  static addDiagram(text: string) {
    return this.post<IDiagramRequest, IGetDiagramResponce>('api/v1/Diagrams', {
      type: diagramTypes.SWIMLANES,
      data: window.btoa(text),
      updatedBy: updatedByType.WEB_REACT
    });
  }

  static updateDiagram(id: string, data: string) {
    return this.put<IDiagramRequest>(`api/v1/Diagrams/${id}`, {
      id,
      data: window.btoa(data),
      updatedBy: updatedByType.WEB_REACT
    })
  }
}