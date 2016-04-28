# scripsi

Build Status: [![Circle CI](https://circleci.com/gh/luketurner/scripsi.svg?style=svg)](https://circleci.com/gh/luketurner/scripsi)

Scripsi is an open-source note-taking/writing/PIM system, inspired by [Workflowy](https://workflowy.com/) and [Notion](https://www.notion.so/). A running implementation is available at [luketurner.org/scripsi](http://luketurner.org/scripsi). (Important: This domain does not support HTTPS. Until that's fixed, I do not recommend that you use this for anything sensitive or personal. If you want to store personal or sensitive data, you should run a copy of `scripsi` using an HTTP server you control.)

## Ideas

- [ ] Keyboard shortcuts
- Organization
  - [ ] Tags (@tags and #tags)
  - [ ] Bookmarks/Favorites
  - [ ] High-level node index
  - [ ] Search
    - [ ] Special operators
- Formatting
  - [ ] KeTeX math typesetting
  - [ ] Rich text with Markdown
  - [ ] Configurable themes/fonts
- Node Types
  - [ ] Ordered lists
  - [ ] Images
  - [ ] Tables
  - [ ] Music/Video
  - [ ] Code
    - [ ] Literate programming
  - [ ] Quotations
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
