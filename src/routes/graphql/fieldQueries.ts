import { PrismaClient } from "@prisma/client";
import { GraphQLList } from "graphql";
import { memberType, memberTypeId } from "./types/memberType.js";
import { postType } from "./types/postType.js";
import { UUIDType } from "./types/uuid.js";
import { userType } from "./types/userType.js";
import { profileType } from "./types/profileType.js";
import DataLoader from "dataloader";
import { MemberType, Post, User, Profile } from "@prisma/client";

type Loaders = {
    memberType: DataLoader<string, MemberType | null>;
    posts: DataLoader<string, Post | null>;
    users: DataLoader<string, User | null>;
    profiles: DataLoader<string, Profile | null>;
};

type Context = {
    prisma: PrismaClient;
    loaders: Loaders;
};

export const fieldQueries = {
    memberTypes: {
        type: new GraphQLList(memberType),
        resolve: async (_, __, { prisma }: Context) => {
            return prisma.memberType.findMany();
        },
    },
    memberType: {
        type: memberType,
        args: {
            id: { type: memberTypeId }
        },
        resolve: async (_, { id }: { id: string }, { loaders }: Context) => {
            return loaders.memberType.load(id);
        },
    },
    posts: {
        type: new GraphQLList(postType),
        resolve: async (_, __, { prisma }: Context) => {
            return prisma.post.findMany();
        },
    },
    post: {
        type: postType,
        args: {
            id: { type: UUIDType }
        },
        resolve: async (_, { id }: { id: string }, { loaders }: Context) => {
            return loaders.posts.load(id);
        },
    },
    users: {
        type: new GraphQLList(userType),
        resolve: async (_, __, { prisma }: Context) => {
            return prisma.user.findMany();
        },
    },
    user: {
        type: userType,
        args: {
            id: { type: UUIDType }
        },
        resolve: async (_, { id }: { id: string }, { loaders }: Context) => {
            return loaders.users.load(id);
        },
    },
    profiles: {
        type: new GraphQLList(profileType),
        resolve: async (_, __, { prisma }: Context) => {
            return prisma.profile.findMany();
        },
    },
    profile: {
        type: profileType,
        args: {
            id: { type: UUIDType }
        },
        resolve: async (_, { id }: { id: string }, { loaders }: Context) => {
            return loaders.profiles.load(id);
        },
    },
};
