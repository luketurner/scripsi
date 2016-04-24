import {StateTree} from '../store/types'

export enum PersistenceType {
  Local
}

export interface PersistenceState {
  persistenceType: PersistenceType;
  lastSaved: Date;
}