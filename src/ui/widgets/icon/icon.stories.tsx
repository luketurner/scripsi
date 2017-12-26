import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Icon, { IconType } from './index';

storiesOf('Icon', module)
  .add('Default', () => (
    <Icon type={IconType.Home} />
  ))
  .add('Default w/Title', () => (
    <Icon type={IconType.Home} title='home' />
  ))
  .add('Inline w/text', () => (
    <div>
      Click here to go <Icon type={IconType.Home} /> Home
    </div>
  ))
  .add('Double size', () => (
    <div style={{'font-size': '2rem'}}>
      <Icon type={IconType.Home} />
    </div>
  ))
  .add('Triple size', () => (
    <div style={{'font-size': '3rem'}}>
      <Icon type={IconType.Home} />
    </div>
  ));
