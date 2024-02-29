import { PrismaClient } from "@prisma/client";

class Prisma {
    public client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    public init(): void {
        this.client = new PrismaClient();
    }
    public getClient(): PrismaClient {
        return this.client;
    }

    public end(): void {
        this.client.$disconnect();
    }
}

export default new Prisma();
