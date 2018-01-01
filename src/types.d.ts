/**
 * Compact interface replacing { [index: string]: MyType } with Dict<MyType>
 * 
 * @interface Dict
 * @template ValType
 */
declare interface Dict<ValType> {
  [index: string]: ValType
}

type Uuid = string;

declare const PRODUCTION: boolean;