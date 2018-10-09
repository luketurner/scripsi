import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Button, ButtonGroup, FormGroup, NonIdealState } from '@blueprintjs/core';

import settings from '../../../settings/store';

export default observer(() => {
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
});
