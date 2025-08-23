// supabase/functions/ingest-chunk/index.ts
// Deno Deploy-style function. Uses SERVICE_ROLE for writes (server-only).

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const { content, embedding, collection, ref, section, url } = await req.json();

    // Basic validation
    if (typeof content !== "string" || !Array.isArray(embedding)) {
      return new Response(JSON.stringify({
        error: "Invalid payload. Expected { content: string, embedding: number[], collection?, ref?, section?, url? }"
      }), { status: 400, headers: { "content-type": "application/json" }});
    }

    // Server-side Supabase client with SERVICE ROLE (never expose this key to the browser)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Call your RPC (created in the migration)
    const { data, error } = await supabase.rpc("upsert_document_chunk", {
      p_content: content,
      p_embedding: embedding,   // number[] length must match vector dim (e.g., 1536)
      p_collection: collection ?? "constitution",
      p_ref: ref ?? "Constitution of Mauritius (2022)",
      p_section: section ?? null,
      p_url: url ?? null
    });

    if (error) {
      console.error("RPC error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ id: data }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  } catch (e) {
    console.error("Unhandled error:", e);
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
});
