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

interface SNodeLeaf {
  id: string
  type: NodeType
  displayStatus: NodeDisplayStatus
  content: string
  props: Dict<any>
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
  props?: Dict<any>
  parent?: string
  collapsed?: boolean
}

export interface NodeTypeProps { 
  node: SNode
  onChange: { (newNode: SNode): void }
}