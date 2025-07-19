import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql"
import { MemberTypeId } from "../../member-types/schemas.js"

export const memberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        BASIC: { value: MemberTypeId.BASIC },
        BUSINESS: { value: MemberTypeId.BUSINESS },
    }
});

export const memberType = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: { type: new GraphQLNonNull(memberTypeId)},
        discount: { type: GraphQLFloat },
        postsLimitPerMonth: { type: GraphQLInt },
    })
});
