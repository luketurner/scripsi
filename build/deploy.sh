#!/bin/bash
set -e

cd dist
git init
git config user.name "Scripsi Deployment"
git config user.email "github@luketurner.org"
git add .
git commit -m "Automatic Deployment"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.)
git push --force --quiet "$1" master:gh-pages