const fs = require('fs');
const path = require('path');

module.exports = {
  git: {
    tagName: 'v${version}',
    commitMessage: 'release: cut the v${version} release',
    tagAnnotation: 'Release ${tagName}',
    requireCleanWorkingDir: false
  },
  github: {
    release: true,
    releaseName: 'Oxygen UI ${version}'
  },
  hooks: {
    'after:bump': 'pnpm install --lockfile-only'
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      header: '# Changelog',
      infile: 'CHANGELOG.md',
      writerOpts: {
        headerPartial: fs.readFileSync(path.join(__dirname, 'release', 'templates', 'header.hbs'), 'utf-8'),
        groupBy: 'scope',
        mainTemplate: fs.readFileSync(path.join(__dirname, 'release', 'templates', 'template.hbs'), 'utf-8'),
        commitGroupsSort: 'title',
        commitsSort: ['type', 'shortDesc'],
      },
    },
    '@release-it-plugins/workspaces': true
  },
  npm: {
    pnpm: true,
    versionArgs: ['--workspaces-update=false'],
    publishArgs: ['--access', 'public'],
    allowSameVersion: true,
    skipChecks: true,
    publish: true
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org'
  }
}
