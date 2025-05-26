import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { postType } from "./postType.js";
import { profileType } from "./profileType.js";
import { PrismaClient, User, Post, Profile } from "@prisma/client";
import DataLoader from "dataloader";

type Loaders = {
    userSubscribedTo: DataLoader<string, User[]>;
    subscribedToUser: DataLoader<string, User[]>;
    userPosts: DataLoader<string, Post[]>;
    userProfile: DataLoader<string, Profile | null>;
};

type Context = {
    prisma: PrismaClient;
    loaders: Loaders;
};

export const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType},
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
        profile: {
            type: profileType,
            resolve: async ({ id }: { id: string }, _, { loaders }: Context) => {
                return loaders.userProfile.load(id);
            },
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: async ({ id }: { id: string}, _, { loaders }: Context) => {
                return loaders.userPosts.load(id);
            },
        },
        userSubscribedTo: {
            type: new GraphQLList(userType),
            resolve: async ({ id }: { id: string}, _, { loaders }: Context) => {
                return loaders.userSubscribedTo.load(id);
            },
        },
        subscribedToUser: {
            type: new GraphQLList(userType),
            resolve: async ({ id }: { id: string}, _, { loaders }: Context) => {
                return loaders.subscribedToUser.load(id);
            },
        },
    }),
});
