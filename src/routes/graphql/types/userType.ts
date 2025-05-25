import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { postType } from "./postType.js";
import { profileType } from "./profileType.js";
import { PrismaClient } from "@prisma/client";

export const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType},
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
        profile: {
            type: profileType,
            resolve: async ({ id }: { id: string }, _, { prisma }: { prisma: PrismaClient }) => {
                return prisma.profile.findUnique({
                    where: { userId: id },
                    include: {
                        memberType: true
                    }
                });
            },
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: async ({ id }: { id: string}, _, { prisma }: { prisma: PrismaClient }) => {
                return prisma.post.findMany({
                    where: { authorId: id }
                });
            },
        },
        userSubscribedTo: {
            type: new GraphQLList(userType),
            resolve: async ({ id }: { id: string}, _, { prisma }: { prisma: PrismaClient }) => {
                return prisma.user.findMany({
                    where: {
                        subscribedToUser: {
                            some: {
                                subscriberId: id
                            }
                        }
                    }
                });
            },
        },
        subscribedToUser: {
            type: new GraphQLList(userType),
            resolve: async ({ id }: { id: string}, _, { prisma }: { prisma: PrismaClient }) => {
                return prisma.user.findMany({
                    where: {
                        userSubscribedTo: {
                            some: {
                                authorId: id
                            }
                        }
                    }
                });
            },
        },
    }),
});
