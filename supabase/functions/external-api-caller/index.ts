import { serve } from 'https://deno.land/std@0.154.0/http/server.ts';

console.log("Calling external API...");

serve(async (req) => {
  try {
    // Making an API request to JSONPlaceholder (a free fake API)
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `External API request failed with status: ${response.status}` }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON data from the response
    const apiData = await response.json();

    // Return the data from the external API as JSON
    return new Response(
      JSON.stringify(apiData),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error calling external API:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while calling the external API' }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
