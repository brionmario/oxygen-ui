module.exports = {
  git: {
    tagName: "v${version}",
    commitMessage: "release: cut the v${version} release",
    tagAnnotation: "Release ${tagName}"
  },
  github: {
    release: true,
    releaseName: "Oxygen UI ${version}"
  },
  hooks: {
    "after:bump": "pnpm install --lockfile-only"
  },
  plugins: {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      infile: "CHANGELOG.md",
      writerOpts: {
        groupBy: "scope"
      }
    },
    "@release-it-plugins/workspaces": true
  },
  npm: {
    pnpm: true,
    versionArgs: ["--workspaces-update=false"],
    publishArgs: ["--access", "public"],
    allowSameVersion: true,
    skipChecks: true,
    publish: true
  },
  publishConfig: {
    access: "public",
    registry: "https://registry.npmjs.org"
  }
}
