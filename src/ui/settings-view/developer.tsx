import * as React from 'react';
import { getSample } from '../../nodes/samples';
import { nodes } from '../../main';
import { Button } from '../components/button';
import { state } from '..';

const loadSample = (name: string) => {
  const doc = getSample(name);
  if (doc) nodes.hydrate(doc);
  state.togglePath('settings'); // close settings after click
};

export const DeveloperSettings = () => {
  return (
    <div>
      <h2>Developer</h2>
      <p>
        Tools and settings for developer use only. Do not use unless you know what you're doing!
      </p>
      <div className='flex bg-red-lightest p-2 rounded items-center justify-around text-red'>
        <div className='h-4'>Destructive Reset:</div>
        <Button onClick={() => loadSample('default')}>Default</Button>
        <Button onClick={() => loadSample('large')}>Large</Button>
        <Button onClick={() => loadSample('features')}>Feature Demo</Button>
      </div>
    </div>
  )
};