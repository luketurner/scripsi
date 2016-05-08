export enum NodeType {
  Text = 1,
  ListItem,
  OrderedListItem,
  DictionaryListItem,
  TodoListItem
}

export enum NodeDisplayStatus {
  Expanded = 1,
  Collapsed
}

export interface SNode {
  id: string
  type: NodeType
  displayStatus: NodeDisplayStatus
  content: string
  props: Dict<any>
  parent: string
  collapsed: boolean
  children: Array<string>
}

export interface SNodeOptions {
  type?: NodeType
  displayStatus?: NodeDisplayStatus
  content?: string
  children?: Array<string>
  props?: Dict<any>
  parent?: string
  collapsed?: boolean
}

export type SNodeDB = Dict<SNode>

export type SNodeSearch = {
  query: string
  results: SNode[]
}

export interface NodeState {
  db: SNodeDB,
  search: SNodeSearch
}
