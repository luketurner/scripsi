export enum LayoutActionType {
  SetLeftSidebar,
  SetRightSidebar,
  SetDisplayNodeId
}

export interface LayoutStateTree {
  displayNodeId?: string,
  sidebar: {
    left?: string,
    right?: string
  }
}