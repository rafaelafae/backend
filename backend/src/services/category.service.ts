import { prismaClient } from "../../prisma/prisma";
import { CreateCategoryInput } from "../dtos/input/category.input";


export class CategoryService {

    async createCategory(userId: string, data: CreateCategoryInput) {
        const existingCategory = await prismaClient.category.findUnique({
            where: {
                name_userId: {
                    name: data.name,
                    userId
                }
            }
        });

        if (existingCategory) throw new Error("Categoria já cadastrada");

        return prismaClient.category.create({
            data: {
                name: data.name,
                userId
            },
        });
    };

    async updateCategory(id: string, userId: string, data: CreateCategoryInput) {
        const existingCategory = await prismaClient.category.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!existingCategory) throw new Error("Categoria não encontrada");

        return prismaClient.category.update({
            where: {
                id
            },
            data: {
                name: data.name
            },
        })
    };

    async deleteCategory(id: string, userId: string) {
        const existingCategory = await prismaClient.category.findFirst({
            where: {
                id,
                userId
            }
        });

        if (!existingCategory) throw new Error("Categoria não encontrada");

        await prismaClient.category.delete({
            where: {
                id
            }
        });

        return true;
    }

    async listCategories(userId: string) {
        return prismaClient.category.findMany({
            where: {
                userId
            },
            orderBy: {
                name: "asc"
            }
        })
    };

}