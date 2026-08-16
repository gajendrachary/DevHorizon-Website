import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_job_applications",
  title: "List job applications",
  description:
    "List career applications submitted to DevHorizon. Only returns rows the signed-in user is allowed to read (admins).",
  inputSchema: {
    role_applied: z.string().trim().optional().describe("Filter by the role applied for."),
    status: z.string().trim().optional().describe("Filter by application status."),
    limit: z.number().int().min(1).max(100).default(25).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ role_applied, status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("job_applications")
      .select(
        "id,full_name,email,mobile,role_applied,application_type,years_experience,skills,current_city,college_university,highest_qualification,status,submitted_at",
      )
      .order("submitted_at", { ascending: false })
      .limit(limit ?? 25);
    if (role_applied) query = query.eq("role_applied", role_applied);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
          structuredContent: { applications: data ?? [] },
        };
  },
});
