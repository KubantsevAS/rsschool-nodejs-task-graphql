import { PrismaClient, Post } from "@prisma/client"
import DataLoader from "dataloader"

export const setLoaders = (prisma: PrismaClient) => ({
    memberType: new DataLoader(async (ids: readonly string[]) => {
        const memberTypes = await prisma.memberType.findMany({
            where: {
                id: {
                    in: [...ids]
                }
            }
        });

        const memberTypeMap = new Map(
            memberTypes.map(memberType => [memberType.id, memberType])
        );

        return ids.map(id => memberTypeMap.get(id) || null);
    }),

    posts: new DataLoader(async (ids: readonly string[]) => {
        const posts = await prisma.post.findMany({
            where: {
                id: {
                    in: [...ids]
                }
            }
        });

        const postMap = new Map(
            posts.map(post => [post.id, post])
        );

        return ids.map(id => postMap.get(id) || null);
    }),

    users: new DataLoader(async (ids: readonly string[]) => {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: [...ids]
                }
            }
        });

        const userMap = new Map(
            users.map(user => [user.id, user])
        );

        return ids.map(id => userMap.get(id) || null);
    }),

    profiles: new DataLoader(async (ids: readonly string[]) => {
        const profiles = await prisma.profile.findMany({
            where: {
                id: {
                    in: [...ids]
                }
            }
        });

        const profileMap = new Map(
            profiles.map(profile => [profile.id, profile])
        );

        return ids.map(id => profileMap.get(id) || null);
    }),

    userPosts: new DataLoader(async (ids: readonly string[]) => {
        const posts = await prisma.post.findMany({
            where: {
                authorId: {
                    in: [...ids]
                }
            }
        });

        const postsByAuthor = new Map<string, Post[]>();
        ids.forEach(id => postsByAuthor.set(id, []));
        posts.forEach(post => {
            const authorPosts = postsByAuthor.get(post.authorId) || [];
            authorPosts.push(post);
            postsByAuthor.set(post.authorId, authorPosts);
        });

        return ids.map(id => postsByAuthor.get(id) || []);
    }),

    userProfile: new DataLoader(async (ids: readonly string[]) => {
        const profiles = await prisma.profile.findMany({
            where: {
                userId: {
                    in: [...ids]
                }
            }
        });

        const profileByUser = new Map(
            profiles.map(profile => [profile.userId, profile])
        );

        return ids.map(id => profileByUser.get(id) || null);
    }),

    userSubscribedTo: new DataLoader(async (ids: readonly string[]) => {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: [...ids]
                }
            },
            include: {
                userSubscribedTo: {
                    include: {
                        author: true
                    }
                }
            }
        });

        const userMap = new Map(
            users.map(user => [
                user.id,
                user.userSubscribedTo.map(sub => sub.author)
            ])
        );

        return ids.map(id => userMap.get(id) || []);
    }),

    subscribedToUser: new DataLoader(async (ids: readonly string[]) => {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: [...ids]
                }
            },
            include: {
                subscribedToUser: {
                    include: {
                        subscriber: true
                    }
                }
            }
        });

        const userMap = new Map(
            users.map(user => [
                user.id,
                user.subscribedToUser.map(sub => sub.subscriber)
            ])
        );

        return ids.map(id => userMap.get(id) || []);
    })
})
