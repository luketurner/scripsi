import {StateTree} from '../store/types'

export enum PersistenceType {
  Local
}

export interface PersistenceStateTree extends StateTree {
  persistenceType: PersistenceType;
  lastSaved: Date;
}