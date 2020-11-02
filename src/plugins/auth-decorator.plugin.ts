import { FastifyPluginAsync, FastifyRequest, FastifyReply, preValidationHookHandler } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
    interface FastifyInstance {
        authenticate: preValidationHookHandler;
    }
}

const myPluginAsync: FastifyPluginAsync = async (fastify) => {
    fastify.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.send(err);
            }
        }
    );
};

export default fp(myPluginAsync);
