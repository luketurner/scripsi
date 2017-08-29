import * as _ from 'lodash';
import { observable, action, runInAction, computed } from 'mobx';
import { v4 as uuidv4 } from 'node-uuid';

import nodeStore from './store';

export class SNode {
  @observable id: string;
  @observable type: NodeType;
  @observable displayStatus: NodeDisplayStatus;
  @observable content: string;
  @observable props: Dict<any>;
  @observable parent?: SNode;
  @observable collapsed: boolean;
  @observable children: Array<SNode>;

  constructor(options: SNodeOptions = {}) {
    this.id = options.id || uuidv4();
    this.type = options.type || NodeType.Text
    this.content = options.content || '';
    this.props = options.props || {};
    this.parent = options.parent || null;
    this.displayStatus = options.displayStatus || NodeDisplayStatus.Expanded;
    this.children = options.children || [];
    this.collapsed = !!options.collapsed;
  }

  @computed get isVisible() {
    if (!nodeStore.searchQuery || nodeStore.searchQuery === '') {
      return true;
    }
    return this.content.includes(nodeStore.searchQuery);
  }

  @action('node.addChildNode')
  addChildNode(newNode: SNode, position?: number): SNode {
    if (position) {
      this.children.splice(position, 0, newNode);
    } else {
      this.children.push(newNode);
    }
    newNode.parent = this;
    return newNode;
  }

  @action('node.addSiblingNode')
  addSiblingNode(newNode: SNode): SNode {
    if (!this.parent) { // TODO
      throw new Error('Unable to create sibling for node with no parent');
    }

    const position = this.parent.findChildIndex(this);

    return this.parent.addChildNode(newNode, position);
  }

  addNodeBelow(newNode: SNode): SNode {
    if (this.children.length === 0) {
      return this.addSiblingNode(newNode);      
    }
    return this.addChildNode(newNode, 0);    
  }

  @action('node.removeChild')
  removeChild(childNode: SNode) {
    const ix = this.findChildIndex(childNode);
    this.children.splice(ix, 1);
    return this;
  }

  @action('node.setParent')
  setParent(newParent: SNode, position?: number) {
    this.parent.removeChild(this);
    newParent.addChildNode(this, position);
    return this;
  }

  promote() {
    if (!this.parent || !this.parent.parent) { // TODO
      throw new Error('Unable to promote node with no parent/grandparent');
    }

    const position = this.parent.parent.findChildIndex(this.parent);
    return this.setParent(this.parent.parent, position + 1);
  }

  demote() {
    if (!this.parent) {
      throw new Error('Unable to demote node with no parent');
    }

    if (this.parent.children.length === 1) {
      throw new Error('Unable to demote node with no siblings');
    }
    
    const position = this.parent.findChildIndex(this);

    if (position === 0) {
      throw new Error('Unable to demote node with no prior siblings');
    }

    const priorSibling = this.parent.children[position - 1];
    return this.setParent(priorSibling);
  }

  findChildIndex(childNode: SNode): number {
    return _.findIndex(this.children, { id: childNode.id });
  }

  remove() {
    this.parent.removeChild(this);
  }

  @action('node.toggleCollapsed')
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  @action('node.setContent')
  setContent(content = '') {
    this.content = content;
  }
}

export interface SNodeOptions {
  id?: string;
  type?: NodeType
  displayStatus?: NodeDisplayStatus
  content?: string
  children?: Array<SNode>
  props?: Dict<any>
  parent?: SNode
  collapsed?: boolean
}

export enum NodeType {
  Text = 1,
  ListItem,
  OrderedListItem,
  DictionaryListItem,
  TodoListItem
}

export enum NodeDisplayStatus {
  Expanded = 1,
  Collapsed
}