import {SNode} from '../types'

export type DBState = Dict<SNode>

export enum DBAction {
  AddChild = 1,
  AddOrphan,
  AddSibling,
  DeleteNode,
  UpdateNode,
  AddNodeTree
}