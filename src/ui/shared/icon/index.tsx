import * as React from 'react';
import * as CSSModule from 'react-css-modules';

const styles = require('./icon.scss');

export enum IconType {
  Plus,
  Minus,
  Home,
  Bookmark,
  Bookmarks,
  Stack,
  Cog,
  IncreaseIndent,
  DecreaseIndent,
  Search,
  UnorderedList,
  Hammer
}

export interface IconProps {
  title?: string;
  type: IconType;
}

const iconStyle = {
  display: 'flex',
  width: '1em',
  height: '1em'
};

const paths = { // Unless otherwise noted, taken from IcoMoon.io
  [IconType.Plus]: 'M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z',
  [IconType.Minus]: 'M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z',
  [IconType.Home]: 'M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z',
  [IconType.Bookmark]: 'M6 0v32l10-10 10 10v-32z',
  [IconType.Bookmarks]: 'M8 4v28l10-10 10 10v-28zM24 0h-20v28l2-2v-24h18z',
  [IconType.Stack]: 'M32 10l-16-8-16 8 16 8 16-8zM16 4.655l10.689 5.345-10.689 5.345-10.689-5.345 10.689-5.345zM28.795 14.398l3.205 1.602-16 8-16-8 3.205-1.602 12.795 6.398zM28.795 20.398l3.205 1.602-16 8-16-8 3.205-1.602 12.795 6.398z',
  [IconType.Cog]: 'M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z',
  [IconType.IncreaseIndent]: 'M0 2h32v4h-32zM12 8h20v4h-20zM12 14h20v4h-20zM12 20h20v4h-20zM0 26h32v4h-32zM0 22v-12l8 6z',
  [IconType.DecreaseIndent]: 'M0 2h32v4h-32zM12 8h20v4h-20zM12 14h20v4h-20zM12 20h20v4h-20zM0 26h32v4h-32zM8 10v12l-8-6z',
  [IconType.Search]: 'M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z',
  [IconType.UnorderedList]: 'M12 2h20v4h-20v-4zM12 14h20v4h-20v-4zM12 26h20v4h-20v-4zM0 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 28c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4z',
  [IconType.Hammer]: 'M31.562 25.905l-9.423-9.423c-0.583-0.583-1.538-0.583-2.121 0l-0.707 0.707-5.75-5.75 9.439-9.439h-10l-4.439 4.439-0.439-0.439h-2.121v2.121l0.439 0.439-6.439 6.439 5 5 6.439-6.439 5.75 5.75-0.707 0.707c-0.583 0.583-0.583 1.538 0 2.121l9.423 9.423c0.583 0.583 1.538 0.583 2.121 0l3.535-3.535c0.583-0.583 0.583-1.538 0-2.121z'
};

export default CSSModule(({ title, type }) => (
  <div styleName='icon' title={title}>
    <svg viewBox='0 0 32 32' role='img'>
        <path d={paths[type]} />
    </svg>
  </div>
), styles);
