import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { memberType } from "./memberType.js";
import { MemberType } from "@prisma/client";
import DataLoader from "dataloader";

type Loaders = {
    memberType: DataLoader<string, MemberType | null>;
};

export const profileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType},
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberType: { 
            type: memberType,
            resolve: async ({ memberTypeId }: { memberTypeId: string }, _, { loaders }: { loaders: Loaders }) => {
                return loaders.memberType.load(memberTypeId);
            },
        },
    })
});
