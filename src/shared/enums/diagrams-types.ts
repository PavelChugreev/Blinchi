export enum diagramTypes {
  SWIMLANE = 'Swimlane',
  ERD ='ERD'
}

export const diagramTitles = {
  [diagramTypes.SWIMLANE]: 'Swimlane',
  [diagramTypes.ERD]: 'Entity Relationship Diagram'
}

export const diagramPrefix = {
  [diagramTypes.SWIMLANE]: 'sequenceDiagram',
  [diagramTypes.ERD]: 'classDiagram'
}

export const diagramPath = {
  [diagramTypes.SWIMLANE]: 'swimlane',
  [diagramTypes.ERD]: 'erd'
}

export type DiagramType = diagramTypes.SWIMLANE | diagramTypes.ERD;

export enum updatedByType {
  WEB_REACT = "Web:React"
}

export type UpdetedByTypes = updatedByType.WEB_REACT