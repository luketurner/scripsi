import bind from 'bind-decorator';
import * as _ from 'lodash';
import { action, observable } from 'mobx';
import * as uuid from 'uuid';

export type SNodeSerialized = Partial<SNode>;

export class SNode {
  @observable public id: string;
  @observable public type: NodeType;
  @observable public content: string;
  @observable public props: Dict<any>;
  @observable public collapsed: boolean;
  @observable public children: Uuid[];

  constructor(params?: SNodeSerialized) {
    params = params || {};
    this.id = params.id || uuid.v4();
    this.type = params.type || NodeType.Text;
    this.content = params.content || '';
    this.props = params.props || {};
    this.children = params.children || [];
    this.collapsed = !!params.collapsed;
  }

  @bind
  @action('node.setType')
  public setType(nodeType: NodeType): SNode {
    this.type = nodeType;
    return this;
  }

  @bind
  @action('node.toggleCollapsed')
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  @bind
  @action('node.setContent')
  public setContent(content = '') {
    this.content = content;
  }

  // Define zero-argument functions for type conversion to improve performance in react components
  @bind public setTypeToList() { this.setType(NodeType.ListItem); }
  @bind public setTypeToText() { this.setType(NodeType.Text); }
  @bind public setTypeToOrderedList() { this.setType(NodeType.OrderedListItem); }
  @bind public setTypeToDictionaryList() { this.setType(NodeType.DictionaryItem); }
  @bind public setTypeToTodo() { this.setType(NodeType.Todo); }
  @bind public setTypeToCodeBlock() { this.setType(NodeType.Code); }
  @bind public setTypeToHeading() { this.setType(NodeType.Heading); }
}

export enum NodeType {
  Text = 'text',
  ListItem = 'list-item',
  OrderedListItem = 'ordered-list-item',
  DictionaryItem = 'dictionary-item',
  Todo = 'todo',
  Code = 'code',
  Heading = 'heading',
}

export enum NodeDisplayStatus {
  Expanded = 'expanded',
  Collapsed = 'collapsed'
}
