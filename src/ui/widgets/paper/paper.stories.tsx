import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Paper from './index';

storiesOf('Paper', module)
  .add('Empty', () => (
    <Paper />
  ))
  .add('Short Text', () => (
    <Paper>Hello, this is a paper thingy! Blah blah blah.</Paper>
  ))
  .add('Long Text', () => (
    <Paper>
      Hello, this is a paper thingy! Blah blah blah. Hopefully this looks good
      even though it's kind of a long line of text.
    </Paper>
  )).add('Multi-Paragraph', () => (
    <Paper>
      <p>
        Hello, this is a paper thingy! Blah blah blah. Hopefully this looks good
        even though it's kind of a long line of text.
      </p>

      <p>
        Also, we can have multiple paragraphs in here! Let's play nicely together, shall we?
      </p>
    </Paper>
  ))
  .add('Interactive', () => (
    <Paper isInteractive={true}>Hello, this is a paper thingy! Click me!.</Paper>
  ));
