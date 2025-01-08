import { serve } from 'https://deno.land/std@0.154.0/http/server.ts';

console.log("Webhook handler is listening...");

serve(async (req) => {
  // Only accept POST requests for webhook calls
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Webhook expects a POST request' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse the incoming JSON payload
    const payload = await req.json();

    // Process the data (you can log it or apply your logic here)
    console.log('Received webhook payload:', payload);

    // Example: Check for specific fields in the webhook payload (customize as needed)
    if (!payload.event || !payload.data) {
      return new Response(
        JSON.stringify({ error: 'Invalid webhook payload. "event" and "data" are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // You can perform actions based on the event type, such as:
    // - Triggering a database update
    // - Calling another API
    // - Logging the event to a file or external service

    // For this example, we just return a success response
    return new Response(
      JSON.stringify({ message: 'Webhook processed successfully', payload }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);

    // Return an error if something went wrong
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing the webhook.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});



// response:
// body:
// {
//     "event": "order_created",
//     "data": {
//       "order_id": 12345,
//       "amount": 199.99,
//       "currency": "USD",
//       "customer_email": "customer@example.com"
//     }
//   }


// response:
// {
//     "message": "Webhook processed successfully",
//     "payload": {
//       "event": "order_created",
//       "data": {
//         "order_id": 12345,
//         "amount": 199.99,
//         "currency": "USD",
//         "customer_email": "customer@example.com"
//       }
//     }
//   }
