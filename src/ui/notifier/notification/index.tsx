import { action, autorun, observable } from 'mobx';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

/**
 * Component used for displaying notifications to the user (confirmations, errors, etc.)
 * 
 * Should by used by creating a new component and adding it to the uiState.notifications,
 * because the notifications are rendered in a consistent way and automatically removed after
 * a certain amount of time.
 * For example: 
 *   const notif = <Notification>Something happened!</Notification>;
 *   uiState.pushNotification(notif);
 * 
 * @export
 * @class Notification
 * @extends {React.PureComponent}
 */
export default CSSModule(({ children }) => {
  return (
    <div styleName='notification'>
      {children}
    </div>
  );
}, require('./notification.css'));