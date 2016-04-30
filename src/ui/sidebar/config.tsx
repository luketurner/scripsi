import * as React from 'react'
import {PersistType} from '../../persistence/types'

interface Handler<T> { (x: T): void }

export interface ConfigSectionProps {
  databaseName: string
  persistType: PersistType
  onChangeDatabaseName: Handler<string>
  onChangePersistType: Handler<PersistType>
  resetState: { (): void }
}

export default (props: ConfigSectionProps) => <div>
  <p>persist location</p><input value={props.persistType} onChange={props.onChangePersistType} />
  <p>db name</p><input value={props.databaseName} onChange={props.onChangeDatabaseName} />
  <p>reset db</p><button onClick={props.resetState}>reset</button>
</div>