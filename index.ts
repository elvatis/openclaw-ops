import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";

function expandHome(p: string): string {
  if (!p) return p;
  if (p === "~") return os.homedir();
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

function safeExec(cmd: string): string {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"], encoding: "utf-8" }).trim();
  } catch {
    return "";
  }
}

function latestFile(dir: string, prefix: string): string | null {
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith(prefix))
      .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);
    return files[0]?.f ?? null;
  } catch {
    return null;
  }
}

export default function register(api: any) {
  const cfg = (api.pluginConfig ?? {}) as { enabled?: boolean; workspacePath?: string };
  if (cfg.enabled === false) return;

  const workspace = expandHome(cfg.workspacePath ?? "~/.openclaw/workspace");
  const cronDir = path.join(workspace, "cron");
  const cronScripts = path.join(cronDir, "scripts");
  const cronReports = path.join(cronDir, "reports");

  api.registerCommand({
    name: "cron",
    description: "Show cron dashboard (jobs + scripts + latest reports)",
    requireAuth: false,
    acceptsArgs: false,
    handler: async () => {
      const lines: string[] = [];
      lines.push("Cron dashboard");
      lines.push("");

      const crontab = safeExec("crontab -l");
      if (crontab) {
        const jobs = crontab
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith("#"));
        lines.push(`Jobs (${jobs.length}):`);
        lines.push("```text");
        for (const j of jobs.slice(0, 50)) lines.push(j);
        if (jobs.length > 50) lines.push("... (truncated)");
        lines.push("```");
      } else {
        lines.push("No crontab entries found (or permission denied).");
      }

      lines.push("");

      try {
        const scripts = fs.readdirSync(cronScripts).filter((f) => f.endsWith(".sh"));
        lines.push(`Scripts (${scripts.length}):`);
        lines.push("```text");
        for (const s of scripts.sort()) {
          const st = fs.statSync(path.join(cronScripts, s));
          lines.push(`${s}  (mtime: ${new Date(st.mtimeMs).toISOString()})`);
        }
        lines.push("```");
      } catch {
        lines.push("No cron/scripts directory found.");
      }

      lines.push("");

      const latestPrivacy = latestFile(cronReports, "github-privacy-scan_");
      if (latestPrivacy) {
        lines.push("Latest privacy scan report:");
        lines.push("```text");
        lines.push(path.join(cronReports, latestPrivacy));
        lines.push("```");
      } else {
        lines.push("No privacy scan report found yet.");
      }

      return { text: lines.join("\n") };
    },
  });

  api.registerCommand({
    name: "privacy-scan",
    description: "Run GitHub privacy scan (safe, report-only)",
    requireAuth: false,
    acceptsArgs: false,
    handler: async () => {
      const script = path.join(workspace, "ops", "github-privacy-scan.sh");
      if (!fs.existsSync(script)) {
        return { text: `privacy scan script not found: ${script}` };
      }

      // Run and capture tail
      let out = "";
      try {
        out = execSync(`bash ${script}`, { encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] });
      } catch (e: any) {
        // Even on non-zero exit, show what we have.
        out = String(e?.stdout ?? "") + "\n" + String(e?.stderr ?? "");
      }

      const report = latestFile(cronReports, "github-privacy-scan_");
      const tail = out.split("\n").slice(-30).join("\n");

      const lines: string[] = [];
      lines.push("Privacy scan finished.");
      if (report) lines.push(`Report: ${path.join(cronReports, report)}`);
      lines.push("");
      lines.push("```text");
      lines.push(tail.trim() || "(no output)");
      lines.push("```");

      return { text: lines.join("\n") };
    },
  });
}
