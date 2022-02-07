import { DiagramType, UpdetedByTypes } from "./enums/diagrams-types";

export interface INode {
  id: string;
  name: string;
  count: number;
  children : INode []
}

export interface IDiagram {
  id: string;
  createdAt: Date;
  type: DiagramType;
  data: string;
  updatedBy: UpdetedByTypes;
  updatedAt: Date;
}

export interface IDiagramRequest {
  id?: string;
  type?: string;
  data: string;
  updatedBy: UpdetedByTypes;
}

export interface IGetAllDiagramsResponce {
  diagrams: IDiagram[];
  limit: number;
  totalAmount: number;
  skipped: number;
}

export interface IGetDiagramResponce {
  diagram: IDiagram;
}