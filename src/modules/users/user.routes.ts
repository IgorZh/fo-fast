import { FastifyInstance } from "fastify";
import _ from "lodash";
import changeLanguageBodySchema from "./schemas/change-language-body.schema.json";
import changeLanguageParamsSchema from "./schemas/change-language-params.schema.json";
import changeLanguageResponseSchema from "./schemas/change-language-response.schema.json";
import { ChangeLanguageBodySchema } from "../../types/change-language-body.schema";
import { ChangeLanguageParamsSchema } from "../../types/change-language-params.schema";
import { ChangeLanguageResponseSchema } from "../../types/change-language-response.schema";
import { findUserById } from "./users.service";

export default async (fastify: FastifyInstance) => {
    fastify.get(
        "/user/profile",
        {
            preValidation: [fastify.authenticate],
        },
        async function (request) {
            return request.user;
        }
    );

    fastify.get<{
        Params: ChangeLanguageParamsSchema;
    }>(
        "/user/profile/:id",
        {
            schema: { params: changeLanguageParamsSchema },
            preValidation: [fastify.authenticate],
        },
        async function (request) {
            return await findUserById(request.params.id);
        }
    );

    fastify.put<{
        Body: ChangeLanguageBodySchema;
        Params: ChangeLanguageParamsSchema;
    }>(
        "/user/profile/:id",
        {
            schema: {
                params: changeLanguageParamsSchema,
                body: changeLanguageBodySchema,
                response: changeLanguageResponseSchema,
            },
            preValidation: [fastify.authenticate],
        },
        async function (request) {
            const user = await findUserById(request.params.id);
            user.language = request.body.language;

            return _.omit(user, ["password"]);
        }
    );
};
