import * as React from 'react';

import settings from '../../settings/store';
import { observer } from 'mobx-react';
import { DropboxSettingsView } from './dropbox';
import { nodeStorage } from '../../persistent-storage';
import { Button } from '../button';

export const SettingsView = observer(() => {
  const backendSettings = settings.settings.backends;
  const allBackends = nodeStorage.getAllBackends();

  const BackendRow = observer(({ name }) => (
    <tr>
      <td>
        { backendSettings.primary === name
          ? <div className='p-2'>PRIMARY</div>
          : <Button onClick={() => backendSettings.setPrimary(name)}>USE</Button>
        }
      </td>
      <td>
        { backendSettings.primary === name
          ? null
          : <Button onClick={() => backendSettings.toggleSecondaryBackend(name)}>
              { backendSettings.secondary.includes(name) ? 'ON' : 'OFF' }
            </Button>
        }
      </td>
      <td className='p-2'>
        {name}
      </td>
    </tr>
  ));

  return (
    <div>
      <h1>Settings</h1>
      <h2>Backends</h2>
      <p>Scripsi can write your data to one or more "backends." Configure your primary and secondary backends below.</p>
      {backendSettings.secondary}
      <table>
        <tbody>
          {allBackends.map(([name, backend]) => <BackendRow name={name} key={name} />)}
        </tbody>
      </table>
      <h2>Dropbox</h2>
      <DropboxSettingsView />
    </div>
  );
});
