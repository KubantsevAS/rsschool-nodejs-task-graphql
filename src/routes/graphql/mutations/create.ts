import { PrismaClient } from "@prisma/client";
import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { memberTypeId } from "../types/memberType.js";
import { postType } from "../types/postType.js";
import { profileType } from "../types/profileType.js";
import { userType } from "../types/userType.js";
import { UUIDType } from "../types/uuid.js";

export const createMutations = {
    createPost: {
        type: new GraphQLNonNull(postType),
        args: {
            dto: {
                type: new GraphQLNonNull(new GraphQLInputObjectType({
                    name: 'CreatePostInput',
                    fields: {
                        title: { type: new GraphQLNonNull(GraphQLString) },
                        content: { type: new GraphQLNonNull(GraphQLString) },
                        authorId: { type: new GraphQLNonNull(UUIDType) }
                    }
                }))
            }
        },
        resolve: async (_, { dto }: { dto: { title: string; content: string; authorId: string } }, { prisma }: { prisma: PrismaClient }) => {
            return prisma.post.create({
                data: dto
            });
        }
    },
    createUser: {
        type: new GraphQLNonNull(userType),
        args: {
            dto: {
                type: new GraphQLNonNull(new GraphQLInputObjectType({
                    name: 'CreateUserInput',
                    fields: {
                        name: { type: new GraphQLNonNull(GraphQLString) },
                        balance: { type: new GraphQLNonNull(GraphQLFloat) }
                    }
                }))
            }
        },
        resolve: async (_, { dto }: { dto: { name: string; balance: number } }, { prisma }: { prisma: PrismaClient }) => {
            return prisma.user.create({
                data: dto
            });
        }
    },
    createProfile: {
        type: new GraphQLNonNull(profileType),
        args: {
            dto: {
                type: new GraphQLNonNull(new GraphQLInputObjectType({
                    name: 'CreateProfileInput',
                    fields: {
                        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
                        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
                        memberTypeId: { type: new GraphQLNonNull(memberTypeId) },
                        userId: { type: new GraphQLNonNull(UUIDType) }
                    }
                }))
            }
        },
        resolve: async (_, { dto }: { dto: { isMale: boolean; yearOfBirth: number; memberTypeId: string; userId: string } }, { prisma }: { prisma: PrismaClient }) => {
            return prisma.profile.create({
                data: dto
            });
        }
    }
}