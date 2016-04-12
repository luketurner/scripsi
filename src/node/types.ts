import {StateTree} from '../store/types'

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
  Delete,
  Update
}

export interface NodeStateTree extends StateTree {
  [key: string]: SNode
}

export interface SNode {
  id: string
  type: NodeType
  displayStatus: NodeDisplayStatus
  content: string
  children: Array<string | SNode>
  props: { [key: string]: any }
  parent: string
}

export interface SNodeOptions {
  type?: NodeType
  displayStatus?: NodeDisplayStatus
  content?: string
  children?: Array<string | SNode>
  props?: { [key: string]: any }
  parent?: string
}