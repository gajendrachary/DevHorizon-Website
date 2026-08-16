import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_form_submission_status",
  title: "Update form submission status",
  description: "Update the status of a contact or quote form submission (admins only).",
  inputSchema: {
    id: z.string().uuid().describe("The submission id."),
    status: z.string().trim().min(1).describe("New status, e.g. 'new', 'contacted', 'closed'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("form_submissions")
      .update({ status })
      .eq("id", id)
      .select("id,name,email,status,updated_at");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data || data.length === 0) {
      return {
        content: [{ type: "text", text: "No submission updated — it does not exist or you lack permission." }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data[0], null, 2) }],
      structuredContent: { submission: data[0] },
    };
  },
});
