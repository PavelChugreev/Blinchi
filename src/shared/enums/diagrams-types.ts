export enum diagramTypes {
  SWIMLANES = 'Swimlane',
  ERD ='ERD'
}

export type DiagramType = diagramTypes.SWIMLANES | diagramTypes.ERD;

export enum updatedByType {
  WEB_REACT = "Web:React"
}

export type UpdetedByTypes = updatedByType.WEB_REACT