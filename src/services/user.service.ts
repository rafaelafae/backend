import { prismaClient } from "../../prisma/prisma";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";
import { hashPassword } from "../utils/hash";


export class UserService {

    async createUser(data: CreateUserInput) {

        const findUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (findUser) throw new Error("Usuário já cadastrado");

        const hash = await hashPassword(data.password);

        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
            }
        });
    };

    async findUser(id: string) {

        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        });

        if (!user) throw new Error("Usuário não encontrado");

        return user;
    };

    async listUsers() {
        return prismaClient.user.findMany();
    }

    async updateUser(id: string, data: UpdateUserInput) {

        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        });

        if (!user) throw new Error("Usuário não encontrado");

        const hash = data.password ? await hashPassword(data.password) : undefined;

        return prismaClient.user.update({
            where: {
                id
            },
            data: {
                name: data.name ?? undefined,
                role: data.role ?? undefined,
                password: hash,
            }
        });
    }

    async deleteUser(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        });

        if (!user) throw new Error("Usuário não encontrado");

        await prismaClient.user.delete({
            where: {
                id
            }
        });

        return true;
    }
}