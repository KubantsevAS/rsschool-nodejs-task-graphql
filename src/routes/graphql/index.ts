import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
    graphql,
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';
import { fieldQueries } from './fieldQueries.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
            prisma
        }
      });
    },
  });
};

const {
    memberTypes,
    memberType,
    posts,
    post,
    users,
    user,
    profile,
    profiles
} = fieldQueries;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            memberTypes,
            memberType,
            posts,
            post,
            users,
            user,
            profiles,
            profile,
        }
    }),
});

export default plugin;
