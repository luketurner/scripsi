import classNames = require('classnames');
import * as React from 'react';
import { MarginPaddingUnit, SizeUnit } from './units';

/**
 * Table component provides pre-styled tables. Not much special here.
 * May eventually want to be implemented without using HTML Tables at all.
 */

export interface HeadingProps extends CellProps {
  width?: SizeUnit;
}

export interface CellProps {
  padding?: MarginPaddingUnit;
  children: React.ReactNode;
}

export interface TableProps {
  headings: React.ReactNode[];
  children: React.ReactNode;
}

export const Row = ({ children }) => <tr>{ children }</tr>;
export const Cell = ({ children, padding = '2' }: CellProps) => <td className={classNames({ [`p-${padding}`]: !!padding })}>{ children }</td>;
export const Heading = ({ children, width, padding = '2' }: HeadingProps) => (
  <th
    className={classNames({
      [`p-${padding}`]: !!padding,
      [`w-${width}`]: !!width,
    })}
  >
    { children }
  </th>
);

export const Table = ({ children, headings }) => (
  <table className='fixed-table w-full p-4 mb-4'>
    <thead>
      <Row>
        {headings}
      </Row>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
);
