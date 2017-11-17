import * as reactDom from 'react-dom';

import { main } from './main';
import store from './store';

import * as sinon from 'sinon';
import { expect, use as chaiUse } from 'chai';
import * as sinonChai from 'sinon-chai';
chaiUse(sinonChai);

describe('Main module', () => {
  let renderSpy;
  let loadSpy;
  
  beforeEach(() => {
    renderSpy = sinon.stub(reactDom, 'render');
    loadSpy = sinon.stub(store.persistence, 'loadFromBackend').resolves({});
  });

  afterEach(() => {
    renderSpy.restore();
    loadSpy.restore();
  });

  it('should call render() after loadFromBackend()', async () => {
    await main();
    expect(renderSpy).to.have.been.calledAfter(loadSpy);
  });

});