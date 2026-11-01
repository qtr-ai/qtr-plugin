const fs = require("fs");

const read = (path) => fs.readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const version = JSON.parse(read(".claude-plugin/plugin.json")).version;
const skill = read("skills/qtr/SKILL.md");
const changelog = read("CHANGELOG.md");

const problems = [];
if (!skill.includes('\nmetadata:\n  version: "' + version + '"\n')) problems.push("metadata.version in SKILL.md");
if (!skill.includes("This is version " + version + " of the QTR skill")) problems.push('"This is version ..." in SKILL.md');
if (!skill.includes('`version: "' + version + '"`')) problems.push("the get_skill_version call in SKILL.md");
const others = [...new Set((skill.match(/\d+\.\d+\.\d+/g) || []).filter((found) => found !== version))];
if (others.length) problems.push("SKILL.md also mentions " + others.join(", "));
const newest = (changelog.match(/^## (\S+)/m) || [])[1];
if (newest !== version) problems.push("the newest CHANGELOG.md entry is " + (newest || "missing"));

if (problems.length) {
  console.error("plugin.json says " + version + ", but check: " + problems.join("; "));
  process.exit(1);
}
console.log("Version " + version + " matches in plugin.json, SKILL.md and CHANGELOG.md.");
