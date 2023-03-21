const { Octokit } = require("@octokit/rest");

const [, , /* node */ /* file */ tag] = process.argv;
// eslint-disable-next-line no-console
const _tag = tag.split("@")[2];
console.log('tag', _tag);

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`,
});

(async () => {
  try {
    // eslint-disable-next-line no-console
    await octokit.repos.createRelease({
      owner: 'brionmario',
      repo: 'oxygen-ui',
      tag_name: _tag,
      body: '## Release /n TBA',
      draft: false
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`release script has failed, details: ${err}`);
    process.exit(1);
  }
})();
