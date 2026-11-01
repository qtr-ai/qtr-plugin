# Releasing a new version

People get a new version only when its number changes. The QTR connector compares the version in a person's skill with the one in this repo, and tells them once when theirs is older.

1. Make the change in `skills/qtr/`. If the connector's tools changed, regenerate the tool list from the qtr-ai-api repo:

   ```
   npx ts-node --transpile-only -r tsconfig-paths/register scripts/qtr-skill/tools-md.ts <this repo>/skills/qtr/references/tools.md
   ```

2. Raise the version, using the same number in all three places:
   - `version` in `.claude-plugin/plugin.json`;
   - `metadata.version` at the top of `skills/qtr/SKILL.md`;
   - the two mentions under "Keeping this skill current" in `skills/qtr/SKILL.md`.
3. Add an entry at the top of `CHANGELOG.md`, headed `## <version> (<date>)`. The connector shows that entry to people on older versions, so write it for them: what they can do now, in a line or two.
4. Push to `main`. The "Check the version" workflow fails if the numbers don't match or the changelog has no entry for the new version.

Within an hour the connector starts telling people on older versions to update. claude.ai, Claude Desktop and Cowork pick up the new version from Anthropic's directory by themselves.
