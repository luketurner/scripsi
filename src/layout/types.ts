export enum LayoutActionType {
  SetLeftSidebar,
  SetRightSidebar,
  SetDisplayNodeId
}

export interface LayoutState {
  displayNodeId?: string,
  sidebar: {
    left?: string,
    right?: string
  }
}