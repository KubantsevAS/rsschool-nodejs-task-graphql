import { PrismaClient } from "@prisma/client";
import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { memberTypeId } from "../types/memberType.js";
import { postType } from "../types/postType.js";
import { profileType } from "../types/profileType.js";
import { userType } from "../types/userType.js";
import { UUIDType } from "../types/uuid.js";

export const changeMutations = {
    changePost: {
        type: new GraphQLNonNull(postType),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
            dto: {
                type: new GraphQLNonNull(new GraphQLInputObjectType({
                    name: 'ChangePostInput',
                    fields: {
                        title: { type: GraphQLString },
                        content: { type: GraphQLString },
                    },
                })),
            },
        },
        resolve: async (_, { id, dto }: { id: string, dto: { title?: string; content?: string } }, { prisma }: { prisma: PrismaClient }) => {
            return prisma.post.update({
                where: {
                    id
                },
                data: dto,
            });
        },
    },
    changeUser: {
        type: new GraphQLNonNull(userType),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
            dto: {
                type: new GraphQLNonNull(new GraphQLInputObjectType({
                    name: 'ChangeUserInput',
                    fields: {
                        name: { type: GraphQLString },
                        balance: { type: GraphQLFloat },
                    },
                })),
            },
        },
        resolve: async (_, { id, dto }: { id: string, dto: { name?: string; balance?: number } }, { prisma }: { prisma: PrismaClient }) => {
            return prisma.user.update({
                where: {
                    id
                },
                data: dto,
            });
        },
    },
    changeProfile: {
        type: new GraphQLNonNull(profileType),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
            dto: {
                type: new GraphQLNonNull(new GraphQLInputObjectType({
                    name: 'ChangeProfileInput',
                    fields: {
                        isMale: { type: GraphQLBoolean },
                        yearOfBirth: { type: GraphQLInt },
                        memberTypeId: { type: memberTypeId },
                    },
                })),
            },
        },
        resolve: async (_, { id, dto }: { id: string, dto: { isMale?: boolean; yearOfBirth?: number; memberTypeId?: string } }, { prisma }: { prisma: PrismaClient }) => {
            return prisma.profile.update({
                where: {
                    id,
                },
                data: dto,
            });
        },
    },
};
