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
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "$1" master:gh-pages > /dev/null 2>&1