import {SNode} from '../types'

export type DBState = Dict<SNode>

export enum DBAction {
  AddChild = 1,
  AddBelow,
  AddOrphan,
  AddSibling,
  DeleteNode,
  Demote,
  Promote,
  UpdateNode
}