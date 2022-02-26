export interface INode {
  id: string;
  name: string;
  count: number;
  children : INode []
}

export interface IGraph {
  id: string;
  text: string;
  type: string;
}