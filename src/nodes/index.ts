import bind from 'bind-decorator';
import { action, computed, observable } from 'mobx';
import { NodeAncestry, NodePosition } from '.';
import { Persistable } from '../persistent-storage/driver';
import { SNode, SNodeSerialized } from './node';

export type NodePosition = [Uuid, number];
export type NodeAncestry = NodePosition[];

export { SNode, SNodeSerialized, NodeType, NodeDisplayStatus } from './node';

export interface SNodeSetSerialized extends Partial<Omit<SNodeSet, 'index'>> {
  index: { [key: string]: SNodeSerialized };
}

export class SNodeSet implements Persistable {
  @observable public rootNode: Uuid;
  @observable public viewRootNode: Uuid;
  @observable public searchQuery: string;
  @observable public index = new Map<Uuid, SNode>();

  @computed public get currentState() {
    return JSON.stringify(this);
  }

  public getNode(id: Uuid): SNode {
    const node = this.index.get(id);
    if (!node) throw new Error('Could not find node with id: ' + id);
    return node;
  }

  @bind
  @action('nodes.setSearchQuery')
  public setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  @bind
  @action('nodes.createNode')
  public createNode(params: SNodeSerialized, position: NodePosition): SNode {
    // create node, populate default values
    const node = new SNode(params);

    // validation
    if (this.index.has(node.id)) { throw new Error(`Cannot create node ${node.id}: ID already exists.`); }

    // insert node
    this.index.set(node.id, node);
    this.insertNode(node.id, position);
    return node;
  }

  @bind
  @action('nodes.promoteNode')
  public promoteNode(id: Uuid, ancestry: NodeAncestry) {
    if (ancestry.length < 2) return;
    const [ [grandparentId, grandparentIx ], parent ] = ancestry.slice(-2);

    this.moveNode(id, parent, [ grandparentId, grandparentIx + 1]);
  }

  @bind
  @action('nodes.demoteNode')
  public demoteNode(id: Uuid, ancestry: NodeAncestry) {
    if (ancestry.length < 1) return;
    const [ [ parentId, parentIx ] ] = ancestry.slice(-1);

    const parentNode = this.getNode(parentId);
    const prevSiblingId = parentNode.children[parentIx - 1];

    this.moveNode(id, [parentId, parentIx], [prevSiblingId, Infinity]);
  }

  @bind
  @action('nodes.insertNode')
  public insertNode(id: Uuid, position: NodePosition) {
    if (!this.index.has(id)) throw new Error(`Invalid node id ${id}.`);
    const [ parentId, ix ] = position;
    const parent = this.getNode(parentId);
    parent.children.splice(ix, 0, id);
  }

  @bind
  @action('nodes.removeNode')
  public removeNode(id: Uuid, position: NodePosition) {
    if (!this.index.has(id)) throw new Error(`Invalid node id ${id}.`);
    const [ parentId, ix ] = position;
    const parent = this.getNode(parentId);
    if (parent.children[ix] !== id) throw new Error(`Found wrong ID. Expected ${id}, got ${parent.children[ix]}`);
    parent.children.splice(ix, 1);

    // TODO -- does not remove node from index since it may have multiple parents
  }

  @bind
  @action('nodes.moveNode')
  public moveNode(id: Uuid, oldPosition: NodePosition, newPosition: NodePosition) {
    this.removeNode(id, oldPosition);
    this.insertNode(id, newPosition);
  }

  @bind
  @action('nodes.loadState')
  public loadState(newState: string) {
    return this.hydrate(JSON.parse(newState));

  }

  @bind
  public hydrate(params: Partial<SNodeSet>) {
    this.rootNode = params.rootNode;
    this.viewRootNode = params.viewRootNode;
    this.searchQuery = params.searchQuery;

    this.index.clear();
    for (const [id, node] of Object.entries(params.index)) {
      if (node.id && node.id !== id) throw new Error('node ID does not match');
      this.index.set(id, new SNode({ id, ...node }));
    }
  }

  @bind
  @action('nodes.resetState')
  public resetState() {
    this.rootNode = null;
    this.viewRootNode = null;
    this.searchQuery = null;
    this.index.clear();
  }
}
