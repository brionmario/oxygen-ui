#!/bin/bash
# get the last published tag
lastTag=$(git describe --tags $(git rev-list --tags --max-count=1))
pnpm scripts/trigger-release.js $lastTag
