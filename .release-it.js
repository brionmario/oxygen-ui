module.exports = {
  "git": {
    "tagName": "oxygen-ui@${version}",
    "commitMessage": "release: cut the v${version} release",
    "tagAnnotation": "Release ${tagName}"
  },
  "github": {
    "release": true,
    "releaseName": "oxygen-ui@${version}"
  },
  "hooks": {
    "after:bump": "pnpm install --lockfile-only"
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "header": "# Changelog",
      writerOpts: {
        commitPartial: commitTemplate
      },
      "gitRawCommitsOpts": {
        format: '%B%n-hash-%n%H%n-gitTags-%n%d%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae%n-gpgStatus-%n%G?%n-gpgSigner-%n%GS'
      },
      "preset": {
        "name": "angular",
        "types": [
          {
            "type": "feat",
            "section": "✨ Features"
          },
          {
            "type": "fix",
            "section": "🐛 Bug Fixes"
          },
          {
            "type": "docs",
            "section": "📚 Documentation"
          }
        ]
      }
    },
    "@release-it-plugins/workspaces": true
  },
  "npm": {
    "pnpm": true,
    "versionArgs": ["--workspaces-update=false"],
    "publishArgs": ["-r", "--access", "public"],
    "allowSameVersion": true,
    "skipChecks": true,
    "publish": false
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  }
}
