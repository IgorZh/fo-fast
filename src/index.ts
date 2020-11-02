import fastify from "fastify";
import proxy from "fastify-http-proxy";
import auth from "./modules/auth/auth.routes";
import users from "./modules/users/user.routes";
import authDecorator from "./plugins/auth-decorator.plugin";
import fastifyJwt from "fastify-jwt";

const server = fastify();

// server.register(proxy, {
//   upstream: "http://www.example.org",
//   prefix: "/api", // optional
//   http2: false, // optional
// });

// server.get("/ping", async (request, reply) => {
//   return "pong\n";
// });

server.register(fastifyJwt, {
    secret: "supersecret",
});
server.register(authDecorator);
server.register(auth);
server.register(users);

server.listen(3002, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
