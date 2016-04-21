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
  AddNodeTree
}

export interface NodeStateTree {
  [key: string]: SNode
}

interface SNodeLeaf {
  id: string
  type: NodeType
  displayStatus: NodeDisplayStatus
  content: string
  props: { [key: string]: any }
  parent: string
  collapsed: boolean
}

export interface SNode extends SNodeLeaf {
  children: Array<string>
}

export interface SNodeTree extends SNodeLeaf {
  children: Array<SNodeTree | SNodeLeaf>
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

export interface NodeTypeProps { 
  node: SNode
  onChange: { (newNode: SNode): void }
}