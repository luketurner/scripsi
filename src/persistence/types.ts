export enum PersistType {
  Local = 1
}

export enum PersistenceActionType {
  SetPersistType = 1,
  SetDatabaseName,
  SaveStarted,
  SaveCompleted,
  SaveFailed,
  LoadStarted,
  LoadCompleted,
  LoadFailed,
  ResetStarted,
  ResetCompleted,
  ResetFailed
}

export interface PersistenceState {
  persistType: PersistType
  isSaving: boolean
  databaseName: string
  lastError: string
}