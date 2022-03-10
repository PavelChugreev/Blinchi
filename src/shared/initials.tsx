import { diagramTypes } from "./enums/diagrams-types"

export const initials = {
	[diagramTypes.SWIMLANE]: `sequenceDiagram
Alice->>John: Hello John, how are you?
John-->>Alice: Great!
Alice-)John: See you later!`,
	[diagramTypes.ERD]: `erDiagram
CUSTOMER ||--o{ ORDER : places
ORDER ||--|{ LINE-ITEM : contains
CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`
}
