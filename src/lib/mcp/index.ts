import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listJobOpeningsTool from "./tools/list-job-openings";
import listJobApplicationsTool from "./tools/list-job-applications";
import listFormSubmissionsTool from "./tools/list-form-submissions";
import updateFormSubmissionStatusTool from "./tools/update-form-submission-status";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "devhorizon",
  title: "DevHorizon",
  version: "0.1.0",
  instructions:
    "Tools for DevHorizon Technologies. Read job openings, career applications and contact/quote form submissions, and update submission status. All access runs as the signed-in DevHorizon user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listJobOpeningsTool,
    listJobApplicationsTool,
    listFormSubmissionsTool,
    updateFormSubmissionStatusTool,
  ],
});
