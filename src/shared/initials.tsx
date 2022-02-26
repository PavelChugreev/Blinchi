export const swimlanesInitial = `graph TD
  A[Client] --> B[Load Balancer]
  B --> C[Server01]
  B --> D[Server02]`

export const mockResponse = {
  1: `sequenceDiagram
  Alice->>Bob: Hello Bob, how are you?
  alt is sick
      Bob->>Alice: Not so good :(
  else is well
      Bob->>Alice: Feeling fresh like a daisy
  end
  opt Extra response
      Bob->>Alice: Thanks for asking
  end`,
  2: `classDiagram
  classA --|> classB : Inheritance
  classC --* classD : Composition
  classE --o classF : Aggregation
  classG --> classH : Association
  classI -- classJ : Link(Solid)
  classK ..> classL : Dependency
  classM ..|> classN : Realization
  classO .. classP : Link(Dashed)`,
  3: `erDiagram
  CAR ||--o{ NAMED-DRIVER : allows
  CAR {
      string registrationNumber
      string make
      string model
  }
  PERSON ||--o{ NAMED-DRIVER : is
  PERSON {
      string firstName
      string lastName
      int age
  }`
}