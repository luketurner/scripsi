import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Button, ButtonGroup, FormGroup, NonIdealState } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/labs';

import settings from '../../../settings/store';
import uiState from '../../state';

const styles = require('./general.scss');

export default CSSModule(observer(() => {
  const onDatabaseNameChanged = action((e: any) => settings.settings.backends.databaseName = e.target.value);

  return (
    <div>
      <FormGroup inline={true} label='Database Name'>
        <input
          className='pt-input'
          type='text'
          value={settings.settings.backends.databaseName}
          onChange={onDatabaseNameChanged}
        />
      </FormGroup>
    </div>
  );
}), styles);
