import { uuid } from '../../util/uuid';
import { SNodeSerialized } from '../node';
import { defaultDocument } from './default';
import { featuresDocument } from './features';
import { largeDocument } from './large';

export const getSample = (sampleName: string) => ({
  default: defaultDocument,
  features: featuresDocument,
  large: largeDocument,
})[sampleName]();

export interface SNodeDenormalized extends Omit<SNodeSerialized, 'children'> {
  children?: SNodeDenormalized[];
}

export const makeIndex = (baseNode: SNodeDenormalized) => {
  const index: Dict<SNodeSerialized> = {};

  const indexNode = (node: SNodeDenormalized, id: string) => {
    index[id] = { 
      ...node,
      id,
      children: (node.children || []).map(childNode => indexNode(childNode, uuid()))
    };
    return id;
  };

  const baseNodeId = indexNode(baseNode, uuid());

  return {
    index,
    rootNode: baseNodeId,
    viewRootNode: baseNodeId,
  };
};
