import * as React from 'react';

import { observer } from 'mobx-react';
import { settings, storageDriver } from '../../main';
import { AuthStatus } from '../../settings/backends';
import { Button } from '../components/button';

export const SettingsView = observer(() => {

  const BackendRow = observer(({ id, settings: backendSettings }) => {
    const isReady = backendSettings.authStatus === AuthStatus.Authenticated;
    const isPreAuth = backendSettings.authStatus === AuthStatus.PreAuthentication;
    const isPrimary = settings.primaryBackendId === id;
    const isSecondary = settings.backupBackendIds.includes(id);
    return (
      <tr>
        <td>
          {backendSettings.name}
        </td>
        <td>
         <div className='text-grey'>{ isReady ? 'Ready' : isPreAuth ? 'Working...' : 'Not Ready' }</div>
        </td>
        <td>
          { !isReady
            ? <Button onClick={() => storageDriver.authenticateBackend(id)}>ENABLE</Button>
            : isPrimary
            ? <div className='text-grey'>ON</div>
            : <Button onClick={() => settings.primaryBackendId = id}>OFF</Button>
          }
        </td>
        <td>
          { !isReady || isPrimary
            ? <div className='text-grey'>N/A</div>
            : isSecondary
            ? <Button onClick={() => settings.backupBackendIds['remove'](id)}>ON</Button>
            : <Button onClick={() => settings.backupBackendIds.push(id)}>OFF</Button>
          }
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Settings</h1>
      <p>
        This page allows you to configure Scripsi's behavior. Settings are saved in your browser's local storage.
      </p>
      <h2>Backends</h2>
      <p>
        Scripsi allows you to control where your data is stored. By default, data is only stored in your Web browser on your computer.
        However, Scripsi can also use Dropbox as a storage backend, allowing you to access your data across different browsers.
      </p>
      <p>
        Use the table below to configure where Scripsi reads and writes data. You must have exactly one read/write
        backend configured, and may optionally specify additional write-only backends for backup purposes.
      </p>
      <table className='ml-4'>
        <thead>
          <tr>
            <th className='w-32'>Backend</th>
            <th className='w-16'>Status</th>
            <th className='w-16'>Read/Write</th>
            <th className='w-16'>Backup</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(settings.backends.entries()).map(([id, s]) => <BackendRow id={id} settings={s} key={id} />)}
        </tbody>
      </table>
    </div>
  );
});
