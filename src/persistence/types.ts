export enum PersistType {
  Local = 1
}

export enum PersistenceActionType {
  SetPersistType = 1,
  SaveStarted,
  SaveCompleted,
  SaveFailed,
  LoadStarted,
  LoadCompleted,
  LoadFailed
}

export interface PersistenceState {
  persistType: PersistType
  isSaving: boolean
  databaseName: string
  lastError: string
}