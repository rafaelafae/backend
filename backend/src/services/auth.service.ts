import { prismaClient } from "../../prisma/prisma";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { UserModel } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";


export class AuthService {

    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (!existingUser || !existingUser.password) throw new Error("Credenciais inválidas");

        const compare = await comparePassword(data.password, existingUser.password);
        if (!compare) throw new Error("Senha incorreta");

        return this.generateTokens(existingUser);
    }

    async register(data: RegisterInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email,
            }
        });

        if (existingUser) throw new Error("Usuário já cadastrado");

        const hash = await hashPassword(data.password);

        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
            }
        })

        return this.generateTokens(user);
    }

    generateTokens(user: UserModel) {
        const token = signJwt({ id: user.id, email: user.email }, "15m");
        const refreshToken = signJwt({ id: user.id, email: user.email }, "7d");

        return { token, refreshToken, user };
    }
}