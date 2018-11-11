import * as React from 'react';
import { textToHtml } from '../../markup';

export interface MarkupProps {
  text: string;
}

export const Markup = ({ text }: MarkupProps) => (
  <div dangerouslySetInnerHTML={{ __html: textToHtml(text) }} />
);
