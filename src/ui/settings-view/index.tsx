import * as _ from 'lodash';
import * as React from 'react';

import { listLanguages } from 'highlight.js';
import { observer } from 'mobx-react';
import { settings, storageDriver } from '../../main';
import { AuthStatus } from '../../settings/backends';
import { Button } from '../components/button';
import { Cell, Heading, Row, Table } from '../components/table';
import { DeveloperSettings } from './developer';

const getLanguages = () => {
  const languages = listLanguages();
  return _.sortBy(languages.map(language => ({
    isDefault: settings.code.defaultLanguage === language,
    isDisabled: settings.code.disabledLanguages.has(language),
    language,
  })), ({ isDefault, isDisabled }) => isDefault ? 3 : isDisabled ? 1 : 2);
};

export const SettingsView = observer(() => {

  const BackendRow = observer(({ id, settings: backendSettings }) => {
    const isReady = backendSettings.authStatus === AuthStatus.Authenticated;
    const isPreAuth = backendSettings.authStatus === AuthStatus.PreAuthentication;
    const isPrimary = settings.primaryBackendId === id;
    const isSecondary = settings.backupBackendIds.includes(id);
    return (
      <Row>
        <Cell>
          {backendSettings.name}
        </Cell>
        <Cell padding='0'>
         <div className='text-grey p-2'>{ isReady ? 'Ready' : isPreAuth ? 'Working...' : 'Not Ready' }</div>
        </Cell>
        <Cell padding='0'>
          { !isReady
            ? <Button onClick={async () => storageDriver.authenticateBackend(id)}>ENABLE</Button>
            : isPrimary
            ? <div className='text-grey p-2'>ON</div>
            : <Button onClick={() => settings.primaryBackendId = id}>OFF</Button>
          }
        </Cell>
        <Cell padding='0'>
          { !isReady || isPrimary
            ? <div className='text-grey p-2'>N/A</div>
            : isSecondary
            ? <Button onClick={() => settings.backupBackendIds['remove'](id)}>ON</Button>
            : <Button onClick={() => settings.backupBackendIds.push(id)}>OFF</Button>
          }
        </Cell>
      </Row>
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
      <Table
        headings={[
          <Heading key={0} width='32'>Backend</Heading>,
          <Heading key={1} width='16'>Status</Heading>,
          <Heading key={2} width='16'>Primary?</Heading>,
          <Heading key={3} width='16'>Backup?</Heading>,
        ]}
      >
        {Array.from(settings.backends.entries()).map(([id, s]) => <BackendRow id={id} settings={s} key={id} />)}
      </Table>
      <h2>Code Blocks</h2>
      <p>
        By default, all code blocks in Scripsi (including <code>` ... `</code> blocks) are syntax-highlighted using&nbsp;
        <a href='https://highlightjs.org/'>highlight.js</a>. Change related settings here. (WIP)
      </p>

      <div className='ml-4 max-h-32 max-w-lg overflow-y-scroll'>
        <table>
          <thead>
            <tr>
              <th className='w-32'>Language</th>
              <th className='w-16'>Status</th>
            </tr>
          </thead>
          <tbody>
            { getLanguages().map(({ language, isDisabled, isDefault }) => {
              return (
                <tr key={language}>
                  <td>{language}</td>
                  <td><input type='checkbox' checked={!isDisabled} disabled={true}/></td>
                  <td>{isDefault ? 'Default' : ''}</td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>

      <DeveloperSettings />
    </div>
  );
});
