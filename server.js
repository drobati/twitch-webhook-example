/*
Webhook receivers should accept a request and immediately respond with HTTP 204 No Content before processing the request. Here's how to do this with hapi.js.

Start this server:
`node webhooks-with-hapi.js`

Then make a request:
`curl http://localhost:8000/webhook-receiver -v`

Note the correct behavior: HTTP response will be sent and connection closed before the webhook processing starts.
*/

// Using hapi ^11.0.0
const Hapi = require('hapi');

async function example() {
    // Create a server with a host and port
    const server = Hapi.server({
        port: 8000,
        //host: 'localhost'
    });

    // Add the route to receive a webhook request
    server.route({
        method: 'GET',
        path:'/api/webhook',
        handler: (request, h) => {
            const challenge = request.query['hub.challenge'];
            console.log(challenge);
            h.response('success').code(200);
            return challenge;
        }
    });


    // Start the server
    await server.start();

    console.log('Server running at:', server.info.uri);
}

example();

