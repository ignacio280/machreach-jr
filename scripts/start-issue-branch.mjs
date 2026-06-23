import { execFileSync } from "node:child_process";

const [, , rawIssueId, ...slugParts] = process.argv;

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"],
  }).trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

if (!rawIssueId || !/^[a-z]+-\d+$/i.test(rawIssueId)) {
  console.error("Usage: npm run branch NUV-13 [optional short slug]");
  process.exit(1);
}

const issueId = rawIssueId.toLowerCase();
const slug = slugify(slugParts.join(" "));
const branchName = slug ? `${issueId}-${slug}` : issueId;

const dirty = run("git", ["status", "--porcelain"]);
const currentBranch = run("git", ["branch", "--show-current"]);

if (dirty && currentBranch !== branchName) {
  console.error(
    "Working tree has uncommitted changes. Commit/stash them before creating a new issue branch.",
  );
  process.exit(1);
}

run("git", ["fetch", "origin"], { stdio: "inherit" });

const localBranches = run("git", ["branch", "--list", branchName]);
if (localBranches) {
  run("git", ["checkout", branchName], { stdio: "inherit" });
  console.log(`Ready on existing branch ${branchName}`);
  process.exit(0);
}

const remoteBranch = run("git", ["ls-remote", "--heads", "origin", branchName]);
if (remoteBranch) {
  run("git", ["checkout", "--track", `origin/${branchName}`], { stdio: "inherit" });
  console.log(`Ready on remote branch ${branchName}`);
  process.exit(0);
}

run("git", ["checkout", "main"], { stdio: "inherit" });
run("git", ["pull", "--ff-only", "origin", "main"], { stdio: "inherit" });
run("git", ["checkout", "-b", branchName], { stdio: "inherit" });

console.log(`Ready on new branch ${branchName}`);
