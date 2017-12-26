import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Icon, { IconType } from '../icon';
import Tile from './index';

storiesOf('Tile', module)
  .add('Text-Only', () => (
    <Tile>About Me</Tile>
  ))
  .add('Icon-Only', () => (
    <Tile iconType={IconType.Home} />
  ))
  .add('Icon and Text', () => (
    <Tile iconType={IconType.Home}>Home</Tile>
  ))
  .add('Unusually Long', () => (
    <Tile iconType={IconType.Home}>Homeward Bound Is Where We Go</Tile>
  ))
  .add('Sub-Elements', () => (
    <Tile iconType={IconType.Home}></Tile>
  ))
  .add('Icon and Text In Row', () => (
    <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
      <Tile iconType={IconType.Home}>Home</Tile>
      <Tile iconType={IconType.Home}>Home</Tile>
      <Tile iconType={IconType.Home}>Home</Tile>
    </div>
  ))
  .add('Icon and Text In Column', () => (
    <div style={{display: 'flex', flexFlow: 'column nowrap', 'align-items': 'left'}}>
      <Tile iconType={IconType.Home}>Home</Tile>
      <Tile iconType={IconType.Home}>Home</Tile>
      <Tile iconType={IconType.Home}>Home</Tile>
    </div>
  ));
