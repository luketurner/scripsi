import * as React from 'react';

import { observer } from 'mobx-react';
import { settings } from '../../main';
import { Button } from '../button';
import { DropboxSettingsView } from './dropbox';

export const SettingsView = observer(() => {

  const BackendRow = observer(({ id, settings: backendSettings }) => (
    <tr>
      <td className='p-2'>
        {backendSettings.name}
      </td>
      <td>
        { settings.primaryBackendId === id
          ? <div className='p-2 text-grey'>ON</div>
          : <Button onClick={() => settings.primaryBackendId = id}>OFF</Button>
        }
      </td>
      <td>
        { settings.primaryBackendId === id
          ? <div className='p-2 text-grey'>N/A</div>
          : settings.backupBackendIds.includes(id)
          ? <Button onClick={() => settings.backupBackendIds['remove'](id)}>ON</Button>
          : <Button onClick={() => settings.backupBackendIds.push(id)}>OFF</Button>
        }
      </td>
    </tr>
  ));

  return (
    <div>
      <h1>Settings</h1>
      <h2>Backends</h2>
      <p>
        Scripsi is designed to give you maximum control over your data by allowing you to configure where it is stored.
        By default, data is only stored in your Web browser on your computer. However, Scripsi does support storing
        data in the cloud using Dropbox.
      </p>
      <p>
        Use the table below to configure where Scripsi reads and writes data. You must have exactly one read/write
        backend configured, and may optionally specify additional write-only backends for backup purposes.
      </p>
      <table className='ml-4'>
        <thead>
          <tr>
            <th className='w-32'>Backend</th>
            <th className='w-16'>Read/Write</th>
            <th className='w-16'>Backup</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(settings.backends.entries()).map(([id, s]) => <BackendRow id={id} settings={s} key={id} />)}
        </tbody>
      </table>
      <h2>Dropbox</h2>
      <DropboxSettingsView />
    </div>
  );
});
