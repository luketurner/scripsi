import { NodeType } from '..';
import { makeIndex } from '.';

export const defaultDocument = () => {
  return makeIndex({
    content: 'Welcome to Scripsi',
    type: NodeType.Heading,
    children: [
      { content: 'Scripsi is an open-source, in-browser note-taking/writing/PIM system. Visit the [help page](#help) for more information.', },
      { content: '**Warning**: This is a development build. You may encounter bugs, including data loss! **Use at your own risk!**', }, 
      { content: 'Press Enter to create a new node and start typing!', },
    ],
  })
};
