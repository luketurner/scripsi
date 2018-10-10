// tslint:disable:max-line-length
import * as React from 'react';
import { Icon, IconType } from './icon';

export interface ButtonProps {
  icon?: IconType;
  text?: string;
  onClick: (e: any) => void;
}

export const Button = ({ icon, text, onClick }: ButtonProps) => (
  <div className='cursor-pointer hover:bg-grey-light h-full p-2' onClick={onClick}>
    { icon ? <Icon type={icon} /> : '' }
    { text || '' }
  </div>
);
