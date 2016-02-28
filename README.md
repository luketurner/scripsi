# scripsi

This application is about writing. I'm trying to build a more feature-complete
Workflowy clone.

The basic data model is something called a Node. This is a little more generic
than the usual writing system. There are different types of nodes. Nodes can
have content, or they can have sub-nodes, or both.

One interesting feature of nodes is that they are identified based on a self-
hash. This means that two nodes with the same properties are considered identical.
However, because the node includes a date-modified timestamp as part of the
hash, two nodes can have identical content and sub-nodes without having the same hash.

Example node: 

``` js
{
  id: "CONTENT-HASH",
  type: "ListItem",
  properties: {
    ordered: false
  },
  content: "This is the list item text",
  children: ["subnode-id-1", "subnode-id-2"]
}
```

The most important type of node is a `ListItem`. If all you used were
`ListItems`, then scripsi is similar to WorkFlowy.

## Ideas

- Organization
  - [ ] Tags (@tags and #tags)
  - [ ] Bookmarks/Favorites
  - [ ] High-level node index
  - [ ] Search
    - [ ] Special operators
- Formatting
  - [ ] KeTeX math typesetting
  - [ ] Rich text with Markdown
- Node Types
  - [ ] Ordered lists
  - [ ] Images
  - [ ] Tables
  - [ ] Music/Video
  - [ ] Code
    - [ ] Literate programming
  - [ ] Quotatinos
  - [ ] Cards?
  - [ ] Todo lists
  - [ ] File uploads
- Integrations
  - [ ] Dropbox
  - [ ] Publish to HTML
    - [ ] Auto-post to blog

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm test
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
