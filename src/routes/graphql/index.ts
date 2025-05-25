import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
    graphql,
    GraphQLFieldMap,
    GraphQLInterfaceType,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt
} from 'graphql';
import { fieldQueries } from './fieldQueries.js';
import { postType } from './types/postType.js';
import { userType } from './types/userType.js';
import { profileType } from './types/profileType.js';
import { memberTypeId } from './types/memberType.js';
import { UUIDType } from './types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { createMutations } from './mutations/create.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const {
    memberTypes,
    memberType,
    posts,
    post,
    users,
    user,
    profiles,
    profile,
  } = fieldQueries;

  const { createPost, createProfile, createUser } = createMutations

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
    mutation: new GraphQLObjectType({
        name: 'RootMutations',
        fields: {
            createPost,
            createUser,
            createProfile,
        }
    })
  });

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

export default plugin;
