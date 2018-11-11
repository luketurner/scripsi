import * as React from 'react';

import { observer } from 'mobx-react';
import { textToHtml } from '../../markup';
import { Markup } from '../components/markup';

export const HelpView = observer(() => {
  return (
    <div>
      <h1>About Scripsi</h1>
      <p>
        Scripsi is an open-source, in-browser note-taking/writing/PIM system,
        inspired by <a href="https://workflowy.com/">Workflowy</a> and <a href="https://www.notion.so/">Notion</a>.
        Scripsi aims to improve on these projects by offering programmer-friendly utilities and allowing you to keep full
        ownership and control of your data.
      </p>
      <p>
        Scripsi organizes information in <em>outlines</em>, which are hierarchical trees of <em>nodes</em>.
        The tree of nodes can be nested with arbitrary depth. For the time being, you are limited to editing a single outline.
      </p>
      <p>
        So, if an outline is a tree of nodes, what's a "node"?
        A Scripsi node is basically a *block-level element*, like a paragraph, header, or code block.
        Different types of nodes can be mixed and matched to best suit the needs of the outline. Some node types can be individually configured.
      </p>
      <h2>Editing</h2>
      <p>
        Click on a node to begin editing it. Use Enter to create a new sibling node. (Use Shift+Enter to regain the normal Enter behavior).
        Tab and Shift-Tab will "indent" and "un-indent" the node, changing its position in the tree. Use Backspace in an empty node to delete it.
      </p>
      <p>
        Hover over a node to reveal the node's handle. Click the handle to expand/collapse the node.
        Click-and-drag the handle to move the node somewhere else in the tree.
        Right-click the handle to expose a context menu for more complex node manipulation.
      </p>
      <h3>Inline Markup</h3>
      <p>
        Most Scripsi nodes allow you to include inline elements like <em>italic text</em>, <strong>bold text</strong>, and <a>external links</a>,
        using a Markdown-esque markup:
      </p>
      <table>
        <thead>
          <tr>
            <th>What you type</th>
            <th>What you see</th>
          </tr>
        </thead>
        <tbody>
          {[
            'This is _italic_, so is *this*.',
            'This is **bold**, so is __this__.',
            'This is [a link](http://google.com).',
            'This is a #tag.',
            'This is `some code`',
            'This is math: $x^2+\\frac{1}{2}$'
          ].map(txt => (
            <tr>
              <td><code>{txt}</code></td>
              <td>
                <Markup text={txt} />
                <pre className='truncate max-w-md'><code className='text-grey'>{textToHtml(txt)}</code></pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        If you want to prevent a character from being interpreted by the markup, prefix it with a <code>\</code>.
        For example, if you use <code>**</code> for exponentiation, you might see something like this:
      </p>
      <table className='ml-16'>
        <tbody>
          {[
            'x is 4**5 and y is 7**8',
          ].map(txt => (
            <tr>
              <td><code>{txt}</code></td>
              <td className='text-red'>
                <Markup text={txt} />
                <pre><code className='text-grey'>{textToHtml(txt)}</code></pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        If you use <code>\</code> to escape the asterisks, the rendered HTML is correct:
      </p>
      <table className='ml-16'>
        <tbody>
          {[
            'x is 4\\*\\*5 and y is 7**8'
          ].map(txt => (
            <tr>
              <td><code>{txt}</code></td>
              <td>
                <Markup text={txt} />
                <pre><code className='text-grey'>{textToHtml(txt)}</code></pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
