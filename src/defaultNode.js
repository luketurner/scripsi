export default {
  content: 'Welcome to Scripsi',
  type: 'ListItem',
  children: [
    {
      content: 'Scripsi is a low-friction, unopinionated document editor, built from the ground up on the principle of giving the user extreme freedom by allowing them to structure their own documents. The same system can be used for GTD-style planning, blog post composition, and structured note-taking. The idea is to create a single system that is versatile enough to be able to contain <em>everything</em> a user wants to unload from their brains, and smart enough to be able to make it easy to organize, sort, and use that information later.'
    },
    {
      content: 'In support of that aim, Scripsi organizes and presents data using a hierarchical, tree-like structure. This will be very familiar to anyone who uses Workflowy (or Word\'s outline view, for the older-school folks). Technically, Scripsi uses a directed acyclic graph, a.k.a. DAG. This differs from a tree in that a single node can have multiple parents. For example, a single ListItem can belong to two separate lists, or a single TODO can exist in two separate places at once.'
    },
    {
      content: 'But, Scripsi supports much more than plain text. Scripsi documents are made up of <em>nodes</em>, which could be plain text nodes (like this one), or list items, TODOs, images, code blocks, etc. Those nodes are organized in a hierarchy for editing and viewing, and non-hierarchical organization is facilitated with tagging.'
    },
    {
      type: 'DefinitionListItem',
      content: 'Node Types',
      children: [
        {
          type: 'TodoListItem',
          content: 'Plain text',
          params: { completed: true },
          children: [
            {
              content: 'Plain text nodes are straightforward and unornamented. Usually, each node contains a single paragraph.'
            }
          ]
        },
        {
          type: 'ListItem',
          content: 'Interactive',
          children: [
            {
              type: 'TodoListItem',
              content: 'Menu'
            },
            {
              type: 'TodoListItem',
              content: 'Card'
            }
          ]
        },
        {
          type: 'ListItem',
          content: 'Lists',
          children: [
            {
              type: 'TodoListItem',
              content: 'Plain (unordered) lists',
              params: { completed: true },
              children: [
                {
                  content: 'Plain lists are the bread-and-butter of any outlining system. In Scripsi, list items should be used anytime you want to impose some hierarchical structure on your document and nothing else seems apropos.'
                }
              ]
            },
            {
              type: 'TodoListItem',
              content: 'Definition lists',
              params: { completed: true }
            },
            {
              type: 'TodoListItem',
              content: 'Numbered lists'
            }
          ]
        }
      ]
    }
  ]
}
