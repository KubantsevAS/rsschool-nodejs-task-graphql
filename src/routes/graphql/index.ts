import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
    graphql,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql';
import { memberType, memberTypeId } from './types/memberType.js';
import { postType } from './types/postType.js';
import { userType } from './types/userType.js';
import { profileType } from './types/profileType.js';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

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

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            memberTypes: {
                type: new GraphQLList(memberType),
                resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.memberType.findMany();
                },
            },
            memberType: {
                type: memberType,
                args: {
                    id: { type: memberTypeId }
                },
                resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.memberType.findUnique({
                        where: { id },
                    });
                },
            },
            posts: {
                type: new GraphQLList(postType),
                resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.post.findMany();
                },
            },
            post: {
                type: postType,
                args: {
                    id: { type: UUIDType }
                },
                resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.post.findUnique({
                        where: { id },
                    });
                },
            },
            users: {
                type: new GraphQLList(userType),
                resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.user.findMany();
                },
            },
            user: {
                type: userType,
                args: {
                    id: { type: UUIDType }
                },
                resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.user.findUnique({
                        where: { id },
                    });
                },
            },
            profiles: {
                type: new GraphQLList(profileType),
                resolve: async (_, __, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.profile.findMany();
                },
            },
            profile: {
                type: profileType,
                args: {
                    id: { type: UUIDType }
                },
                resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
                    return prisma.profile.findUnique({
                        where: { id },
                    });
                },
            },
        }
    }),
});

export default plugin;
