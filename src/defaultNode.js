export default {
  content: 'Welcome to Scripsi',
  type: 'ListItem',
  children: [
    {
      content: 'About',
      type: 'DefinitionListItem',
      children: [{
        content: 'Scripsi is a document editor with a streamlined tree-based interface. ' +
                 'It makes it possible to do a combination of Workflowy and Notion things.'
      }]
    },
    {
      content: 'Features',
      type: 'DefinitionListItem',
      children: [
        {
          type: 'Text',
          content: 'These are the features I plan to implement'
        },
        {
          type: 'TodoListItem',
          content: 'Index (complete list of nodes)',
          params: { completed: true }
        },
        {
          type: 'TodoListItem',
          content: 'Bookmarks (like Workflowy stars)',
          params: { completed: true }
        }, {
          type: 'TodoListItem',
          content: 'Drag-and-drop interface'
        }, {
          type: 'TodoListItem',
          content: 'Menu-driven interface'
        },
        {
          type: 'TodoListItem',
          content: 'Keyboard-driven interface'
        },
        {
          type: 'TodoListItem',
          content: 'Custom themes and fonts'
        }
      ]
    }
  ]
}
