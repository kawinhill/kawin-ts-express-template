import Prisma from "../providers/Prisma";

export default class User {
    public static getByUsername(username: string) {
        return Prisma.client.user.findUnique({
            where: {
                username: username,
            },
        });
    }
    public static getUserByUUID(uuid: string) {
        return Prisma.client.user.findUnique({
            where: {
                uuid: uuid,
            },
        });
    }

    public static createUser(username: string, password: string) {
        return Prisma.client.user.create({
            data: {
                username: username,
                password: password,
            },
        });
    }

    public static generateToken(user: any) {
        return Prisma.client.token.create({
            data: {
                user: {
                    connect: {
                        uuid: user.uuid,
                    },
                },
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        });
    }

    public static async getByToken(token: string) {
        const tokenData = await Prisma.client.token.findUnique({
            where: {
                token: token,
            },
        });
        if (!tokenData) {
            return null;
        }
        if (tokenData.expires < new Date()) {
            return null;
        }
        // update token expiration
        await Prisma.client.token.update({
            where: {
                token: token,
            },
            data: {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
        });
        return this.getUserByUUID(tokenData.userUuid);
    }
}
