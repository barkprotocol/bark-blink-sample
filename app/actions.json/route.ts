import { createActionHeaders, type ActionsJson } from "@solana/actions";

// Handler for GET requests
export const GET = async () => {
  // Define the payload with routing rules
  const payload: ActionsJson = {
    rules: [
      // Map all root-level routes to an action
      {
        pathPattern: "/*",
        apiPath: "/api/actions/*",
      },
      // Idempotent rule as the fallback for API routes
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };

  // Return the payload as JSON with the appropriate headers
  return Response.json(payload, {
    headers: createActionHeaders(),
  });
};

// Handler for OPTIONS requests to handle CORS preflight requests
export const OPTIONS = GET;
