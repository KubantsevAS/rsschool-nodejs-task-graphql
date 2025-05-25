import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { postType } from "./postType.js";
import { profileType } from "./profileType.js";

export const userType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType},
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
        profile: { type: profileType },
        posts: { type: new GraphQLList(postType)},
        userSubscribedTo: { type: new GraphQLList(userType)},
        subscribedToUser: { type: new GraphQLList(userType)}
    })
});
