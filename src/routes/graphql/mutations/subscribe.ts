import { PrismaClient } from "@prisma/client";
import { GraphQLBoolean, GraphQLNonNull } from "graphql";
import { UUIDType } from "../types/uuid.js";

export const subscribeMutation = {
    subscribeTo: {
        type: GraphQLBoolean,
        args: {
            userId: { type: new GraphQLNonNull(UUIDType) },
            authorId: { type: new GraphQLNonNull(UUIDType) }
        },
        resolve: async (
            _, 
            { userId, authorId }: { userId: string, authorId: string },
            { prisma }: { prisma: PrismaClient }
        ) => {
            await prisma.subscribersOnAuthors.create({
                data: {
                    subscriberId: userId,
                    authorId,
                }
            });
        },
    },
    unsubscribeFrom: {
        type: GraphQLBoolean,
        args: {
            userId: { type: new GraphQLNonNull(UUIDType) },
            authorId: { type: new GraphQLNonNull(UUIDType) }
        },
        resolve: async (
            _,
            { userId, authorId }: { userId: string, authorId: string },
            { prisma }: { prisma: PrismaClient }
        ) => {
            await prisma.subscribersOnAuthors.delete({
                where: {
                    subscriberId_authorId: {
                      subscriberId: userId,
                      authorId: authorId,
                    },
                  },
            });
        },
    },
};
