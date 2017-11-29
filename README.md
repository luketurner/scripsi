# scripsi

Build Status: [![Circle CI](https://circleci.com/gh/luketurner/scripsi.svg?style=svg)](https://circleci.com/gh/luketurner/scripsi)

Scripsi is an open-source note-taking/writing/PIM system, inspired by [Workflowy](https://workflowy.com/) and [Notion](https://www.notion.so/). A running implementation is available at [luketurner.org/scripsi](http://luketurner.org/scripsi). (Important: This domain does not support HTTPS. Until that's fixed, I do not recommend that you use this for anything sensitive or personal. If you want to store personal or sensitive data, you should run a copy of `scripsi` using an HTTP server you control.)

# About

Scripsi organizes information in *documents*, which are hierarchical trees of *nodes*. Documents can be nested with arbitrary depth, and may contain thousands of nodes. A single document contains and structures all your information: instead of having a Home document and a Work document, you just have a single document with Home and Work subsections.

So, if a document is a tree of nodes, what's a "node"? A Scripsi node is basically a *block-level element* of the document, like a paragraph, header, or code block. Different types of nodes can be mixed and matched to best suit the needs of the document. Documents can be entirely textual, structured in a Workflowy-esque outline, or they can include rich content and complex formatting.

## Writing

Create nodes with enter, remove old ones with backspace, etc.

# Nodes

The simplest node is the `Text` node, which represents a single paragraph or line of text. A Text node doesn't have any special visual rendering. The node's text can include inline elements like bolding, links, etc. By default, new Scripsi nodes are created as text nodes.

The following types of nodes are currently supported:

- [ ] Headings
- [x] Text
- [x] Lists
- [ ] Numbered lists
- [ ] Todo lists
- [ ] Code
  - [ ] Syntax highlighting
  - [ ] Literate programming
- [ ] Quotations
- [ ] Tables
- [ ] Cards
- [ ] File uploads
- [ ] Images
- [ ] Music/Video

## Inline Formatting

Within most textual nodes, you can take advantage of some inline formatting elements:

- [x] Basic rich text
  - [ ] Markdown syntax
- [ ] Tags (#tags and @tags)
- [ ] LaTeX math formatting

## Organization

Scripsi's tree-based structure already provides a method for organizing hierarchical data. There are also some non-hierarchical ways to organize your nodes:

- [x] Searching
  - [ ] Advanced searching with query language
  - [ ] Using tags for searching
- [ ] Starred/Bookmarked nodes
- [ ] Flat list of all nodes

# Configuration & Usage

## Saving Documents

By default, Scripsi stores your document in your browser's offline storage. This is convenient and fast for getting started, but long-term usage presents a problem: Your notes will be tied to your browser, and there is the possibility that the browser will size-limit or delete the document.

Instead, it's recommended you use one of the other backends available to store your notes. The backends currently supported are:

- [x] IndexedDB (Browser Storage API)
- [ ] Dropbox
- [ ] Amazon S3
- [ ] Firebase/GCS
- [ ] Custom Web API

### Dropbox

The Dropbox backend requires a Dropbox access key to be configured in order to back up your data. It saves the document as a single database file in the Scripsi folder on your Dropbox account, plus additional files to store raw data like images or file uploads.


## Misc. Ideas

- [ ] Configurable themes/fonts
- [ ] Publish to HTML
  - [ ] Auto-post to blog

# Developer Tools

``` bash
npm install       # Install all dependencies

npm test          # run unit tests
npm run test-dev  # Run unit tests with file watching

npm run dev       # serve local dev server with live-reload at localhost:8080
npm run storybook # Run Storybook server (UI component visual testing)

npm run tslint    # run tslint
npm run build     # output minified production build to /build
npm run deploy    # push /build folder to gh-pages branch

```
