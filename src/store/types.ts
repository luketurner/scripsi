

/**
 * Defines a more explicit interface for Redux actions. Requires an ActionType,
 * but otherwise serves as a grab-bag object. 
 * 
 * @interface Action
 * @template T
 */
export interface Action<T> {
  ActionType: T;
  [key: string]: any;
}


/**
 * Abstract state tree type.
 * 
 * @interface StateTree
 */
export interface StateTree {
  [key: string]: any // TODO make this type more explicit
}