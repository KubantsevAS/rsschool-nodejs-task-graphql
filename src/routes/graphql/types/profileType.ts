import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { memberType } from "./memberType.js";

export const profileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: UUIDType},
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberType: { type: memberType },
    })
});
