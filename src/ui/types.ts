export enum UIAction {
  SetDisplayNodeId = 1,
  ToggleLeftSidebar
}

export interface UIState {
  displayNodeId?: string
  showLeftSidebar: boolean
}