import { serve } from 'https://deno.land/std@0.154.0/http/server.ts';

console.log("Hello from the Edge Function!");

serve(async (req) => {
  try {
    const { name } = await req.json();

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Data transformation: converting name to uppercase as an example
    const transformedData = {
      message: `Hello, ${name.toUpperCase()}! Welcome to Supabase Edge Functions.`,
    };

    // Return the transformed data as a JSON response
    return new Response(
      JSON.stringify(transformedData),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error processing the request:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
