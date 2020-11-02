import { FastifyInstance } from "fastify";
import { LoginBodySchema } from "../../types/login.schema";
import { findUserByName } from "../users/users.service";
import _ from "lodash";
import loginBodySchema from "./schemas/login.schema.json";

export default async (fastify: FastifyInstance) => {
    fastify.post<{ Body: LoginBodySchema }>(
        "/auth/login",
        { schema: { body: loginBodySchema } },
        async ({ body: { password, username } }, reply) => {
            const user = await findUserByName(username);

            if (user.password === password) {
                const token = fastify.jwt.sign(_.omit(user, ["id"]));
                reply.send({ token });
            }

            reply.code(401).send(new Error());
        }
    );
};
