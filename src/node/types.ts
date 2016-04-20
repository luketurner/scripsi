export enum NodeType {
  Text,
  ListItem,
  OrderedListItem,
  DictionaryListItem,
  TodoListItem
}

export enum NodeDisplayStatus {
  Expanded,
  Collapsed
}

export enum NodeActionType {
  AddChild,
  AddOrphan,
  AddSibling,
  DeleteNode,
  UpdateNode,
  ImportNodes
}

export interface NodeStateTree {
  [key: string]: SNode
}

export interface SNode {
  id: string
  type: NodeType
  displayStatus: NodeDisplayStatus
  content: string
  children: Array<string>
  props: { [key: string]: any }
  parent: string
  collapsed: boolean
}

export interface SNodeOptions {
  type?: NodeType
  displayStatus?: NodeDisplayStatus
  content?: string
  children?: Array<string>
  props?: { [key: string]: any }
  parent?: string
  collapsed?: boolean
}