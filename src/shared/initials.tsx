import { diagramTypes } from "./enums/diagrams-types"

export const initials = {
	[diagramTypes.SWIMLANE]: `sequenceDiagram
Alice->>John: Hello John, how are you?
John-->>Alice: Great!
Alice-)John: See you later!`,
	[diagramTypes.ERD]: `classDiagram
class BankAccount
BankAccount : +String owner
BankAccount : +Bigdecimal balance
BankAccount : +deposit(amount)
BankAccount : +withdrawl(amount)`
}
