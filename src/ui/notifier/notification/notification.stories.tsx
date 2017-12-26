import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Icon, { IconType } from '../../widgets/icon';
import Notification from './index';

storiesOf('Notification', module)
  .add('Simple Notification', () => (
    <Notification>
      Here's something for you to be click on: 
      <a href="#">Click here.</a>
    </Notification>
  ))
  .add('Icon', () => (
    <Notification>
      <Icon type={IconType.Search} />
      Can I help you find what you're looking for?
    </Notification>
  ));
