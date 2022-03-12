import { BaseClient } from "./BaseClient";
import { AxiosRequestConfig } from "axios";
import { IDiagramRequest, IGetAllDiagramsResponce, IGetDiagramResponce } from "../shared/interfaces";
import { diagramTypes, updatedByType } from "../shared/enums/diagrams-types";

export class DiagramsClient extends BaseClient {

  static getAllDiagrams(config?: AxiosRequestConfig) {
    return this.get<IGetAllDiagramsResponce>('api/v1/Diagrams?', {
      params: {
        SortBy: 'updatedat_desc',
        ...config?.params
      }
    });
  }
  
  static getDiagram(id: string) {
    return this.get<IGetDiagramResponce>(`api/v1/Diagrams/${id}`)
  }

  static addDiagram(text: string, type: diagramTypes) {
    return this.post<IDiagramRequest, IGetDiagramResponce>('api/v1/Diagrams', {
      type,
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