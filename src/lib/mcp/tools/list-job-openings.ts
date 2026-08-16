import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_job_openings",
  title: "List job openings",
  description: "List DevHorizon job openings, optionally filtered by status (active, closed).",
  inputSchema: {
    status: z.string().trim().optional().describe("Filter by opening status, e.g. 'active'."),
    limit: z.number().int().min(1).max(100).default(25).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("job_openings")
      .select("id,title,department,job_type,work_mode,location,experience_level,salary_range,skills,status,created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 25);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
          structuredContent: { openings: data ?? [] },
        };
  },
});
