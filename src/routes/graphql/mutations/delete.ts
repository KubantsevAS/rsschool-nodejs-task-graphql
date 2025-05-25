import { PrismaClient } from "@prisma/client";
import { GraphQLNonNull, GraphQLBoolean } from "graphql";
import { postType } from "../types/postType.js";
import { profileType } from "../types/profileType.js";
import { userType } from "../types/userType.js";
import { UUIDType } from "../types/uuid.js";

export const deleteMutations = {
    deletePost: {
        type: new GraphQLNonNull(GraphQLBoolean),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
            await prisma.post.delete({
                where: {
                    id
                }
            });
            return true;
        }
    },
    deleteUser: {
        type: new GraphQLNonNull(GraphQLBoolean),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
            await prisma.user.delete({
                where: {
                    id
                },
            });
            return true;
        }
    },
    deleteProfile: {
        type: new GraphQLNonNull(GraphQLBoolean),
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: { id: string }, { prisma }: { prisma: PrismaClient }) => {
            await prisma.profile.delete({
                where: {
                    id
                },
            });
            return true;
        }
    }
};
