export interface INode {
  id: string;
  name: string;
  count: number;
  children : INode []
}

export interface IDiagram {
  id: string;
  createdAt: string;
  type: string;
  data: string;
  updatedBy: string;
  updatedAt: string;
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