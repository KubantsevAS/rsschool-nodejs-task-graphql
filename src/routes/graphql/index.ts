import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
    graphql,
    parse,
    validate,
    GraphQLObjectType,
    GraphQLSchema,
    DocumentNode,
    GraphQLError
} from 'graphql';
import { fieldQueries } from './fieldQueries.js';
import { createMutations } from './mutations/create.js';
import { changeMutations } from './mutations/change.js';
import { deleteMutations } from './mutations/delete.js';
import { subscribeMutation } from './mutations/subscribe.js';
import depthLimit from 'graphql-depth-limit';
import { setLoaders } from './loaders.js';

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

  const { createPost, createProfile, createUser } = createMutations;
  const { changePost, changeProfile, changeUser } = changeMutations;
  const { deletePost, deleteProfile, deleteUser } = deleteMutations;
  const { subscribeTo, unsubscribeFrom } = subscribeMutation;

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
            changePost,
            changeProfile,
            changeUser,
            deletePost,
            deleteProfile,
            deleteUser,
            subscribeTo,
            unsubscribeFrom,
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
    handler: (req) => {
      const document: DocumentNode = parse(req.body.query);
      const validationErrors: readonly GraphQLError[] = validate(schema, document, [depthLimit(5)]);

      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }

      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
            prisma,
            loaders: setLoaders(prisma)
        },
      });
    },
  });
};

export default plugin;
