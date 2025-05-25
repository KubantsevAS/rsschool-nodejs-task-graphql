import { PrismaClient } from "@prisma/client";
import { GraphQLList } from "graphql";
import { memberType, memberTypeId } from "./types/memberType.js";
import { postType } from "./types/postType.js";
import { UUIDType } from "./types/uuid.js";
import { userType } from "./types/userType.js";
import { profileType } from "./types/profileType.js";

export const fieldQueries = {
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
};
