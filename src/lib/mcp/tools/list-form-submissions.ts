import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_form_submissions",
  title: "List form submissions",
  description:
    "List contact and quote form submissions. Only returns rows the signed-in user is allowed to read (admins).",
  inputSchema: {
    form_type: z.string().trim().optional().describe("Filter by form type, e.g. 'quote' or 'contact'."),
    status: z.string().trim().optional().describe("Filter by submission status."),
    limit: z.number().int().min(1).max(100).default(25).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ form_type, status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("form_submissions")
      .select("id,name,email,phone,company,form_type,services,budget,timeline,message,status,created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 25);
    if (form_type) query = query.eq("form_type", form_type);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
          structuredContent: { submissions: data ?? [] },
        };
  },
});
