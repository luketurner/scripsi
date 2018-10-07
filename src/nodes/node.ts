import * as _ from 'lodash';
import { action, autorun, computed, observable, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'node-uuid';
import bind from 'bind-decorator';

import nodeStore from './store';

export class SNode {
  @observable public id: string;
  @observable public type: NodeType;
  @observable public displayStatus: NodeDisplayStatus;
  @observable public content: string;
  @observable public props: Dict<any>;
  @observable public collapsed: boolean;
  @observable public parent?: Uuid;
  @observable public children: Uuid[];

  constructor(options: SNodeOptions = {}) {
    this.id = options.id || uuidv4();
    this.type = options.type || NodeType.Text;
    this.content = options.content || '';
    this.props = options.props || {};
    this.parent = options.parent || null;
    this.displayStatus = options.displayStatus || NodeDisplayStatus.Expanded;
    this.children = options.children || [];
    this.collapsed = !!options.collapsed;
  }

  get parentNode(): SNode {
    return nodeStore.getNode(this.parent);
  }

  public *getChildNodes(): IterableIterator<SNode> {
    for (const childId of this.children) {
      yield nodeStore.getNode(childId);
    }
  }

  @computed get isVisible() {
    if (!nodeStore.searchQuery || nodeStore.searchQuery === '') {
      return true;
    }
    return this.content.includes(nodeStore.searchQuery);
  }

  @bind
  @action('node.setType')
  public setType(nodeType: NodeType): SNode {
    this.type = nodeType;
    return this;
  }

  @bind
  @action('node.addChildNode')
  public addChildNode(newNode: SNode, position?: number): SNode {
    if (position) {
      this.children.splice(position, 0, newNode.id);
    } else {
      this.children.push(newNode.id);
    }
    newNode.parent = this.id;
    return nodeStore.addNode(newNode);
  }

  @bind
  @action('node.addSiblingNode')
  public addSiblingNode(newNode: SNode): SNode {
    const parent = this.parentNode;

    if (!parent) { // TODO
      throw new Error('Unable to create sibling for node with no parent');
    }

    const position = parent.findChildIndex(this);

    return parent.addChildNode(newNode, position);
  }

  @bind
  @action('node.addNodeBelow')
  public addNodeBelow(newNode: SNode): SNode {
    if (this.children.length === 0) {
      return this.addSiblingNode(newNode);
    }
    return this.addChildNode(newNode, 0);
  }

  @bind
  @action('node.removeChild')
  public removeChild(childNode: SNode) {
    const ix = this.findChildIndex(childNode);
    this.children.splice(ix, 1);
    nodeStore.removeNode(childNode);
    return this;
  }

  @bind
  @action('node.setParent')
  public setParent(newParent: SNode, position?: number) {
    const parent = this.parentNode;
    parent.removeChild(this);
    newParent.addChildNode(this, position);
    return this;
  }

  @bind
  @action('node.promote')
  public promote() {
    const parent = this.parentNode;

    if (!parent || !parent.parent) { // TODO
      throw new Error('Unable to promote node with no parent/grandparent');
    }

    const grandparent = parent.parentNode;

    const position = grandparent.findChildIndex(parent);
    return this.setParent(grandparent, position + 1);
  }

  @bind
  @action('node.demote')
  public demote() {
    const parent = this.parentNode;
    if (!parent) {
      throw new Error('Unable to demote node with no parent');
    }

    if (parent.children.length === 1) {
      throw new Error('Unable to demote node with no siblings');
    }

    const position = parent.findChildIndex(this);

    if (position === 0) {
      throw new Error('Unable to demote node with no prior siblings');
    }

    const priorSiblingId = parent.children[position - 1];
    return this.setParent(nodeStore.getNode(priorSiblingId));
  }

  @bind
  public findChildIndex(childNode: SNode): number {
    return this.children.findIndex(node => node === childNode.id);
  }

  @bind
  @action('node.remove')
  public remove() {
    this.parentNode.removeChild(this);
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

  /**
   * Checks whether otherNodeId is a descendant of the current node.
   * Recursively walks all child nodes, so this function has annoyingly
   * slow run-time properties, but it can be useful to detect/avoid cyclical
   * descendant/ancestor relationships.
   *
   * @param {string} otherNodeId
   * @returns {boolean}
   * @memberof SNode
   */
  @bind
  public hasDescendant(otherNodeId: string): boolean {
    for (const child of this.getChildNodes()) {
      if (child.id === otherNodeId) return true;
      if (child.hasDescendant(otherNodeId)) return true;
    }
    return false;
  }

  // normalize(): Dict<FlatSNode> {
  //   const normalizedNodes = {};

  //   return this.children.reduce((memo, child) => {
  //     return Object.assign(memo, child.normalize());
  //   }, {
  //     [this.id]: Object.assign(new FlatSNode(), _.omit(this, ['parent', 'children']), {
  //       parent: this.parent && this.parent.id,
  //       children: this.children.map((child) => child.id)
  //     })
  //   });
  // }

  // static denormalize(rootNode: FlatSNode, normalizedNodes: Dict<FlatSNode>): SNode {
  //   const node = new SNode(_.omit(rootNode, ['parent', 'children']));
  //   node.parent = rootNode.parent && normalizedNodes[rootNode.parent];
  // }
}

export interface SNodeOptions {
  id?: string;
  type?: NodeType;
  displayStatus?: NodeDisplayStatus;
  content?: string;
  children?: Uuid[];
  props?: Dict<any>;
  parent?: Uuid;
  collapsed?: boolean;
}

export enum NodeType {
  Text = 1,
  ListItem,
  OrderedListItem,
  DictionaryListItem,
  TodoListItem,
  CodeBlock
}

export enum NodeDisplayStatus {
  Expanded = 1,
  Collapsed
}
