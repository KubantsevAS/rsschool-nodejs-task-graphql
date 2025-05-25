import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { memberType } from "./memberType.js";
import { PrismaClient } from "@prisma/client";

export const profileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType},
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberType: { 
            type: memberType,
            resolve: async ({ memberTypeId }: { memberTypeId: string }, _, { prisma }: { prisma: PrismaClient }) => {
                return prisma.memberType.findUnique({
                    where: { id: memberTypeId },
                });
            },
        },
    })
});
