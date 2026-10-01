import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuth } from "../middlewares/auth.middleware";
import { AuthenticatedContext } from "../graphql/context";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";


@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
    private categoryService = new CategoryService();

    @Mutation(() => CategoryModel)
    async createCategory(
        @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
        @Ctx() ctx: AuthenticatedContext
    ): Promise<CategoryModel> {
        return this.categoryService.createCategory(ctx.user, data);
    };

    @Mutation(() => CategoryModel)
    async updateCategory(
        @Arg('id', () => String) id: string,
        @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
        @Ctx() ctx: AuthenticatedContext
    ): Promise<CategoryModel> {
        return this.categoryService.updateCategory(id, ctx.user, data);
    };

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg('id', () => String) id: string,
        @Ctx() ctx: AuthenticatedContext
    ): Promise<Boolean> {
        return this.categoryService.deleteCategory(id, ctx.user);
    };

    @Query(() => [CategoryModel])
    async listCategories(
        @Ctx() ctx: AuthenticatedContext
    ): Promise<CategoryModel[]> {
        return this.categoryService.listCategories(ctx.user);
    };
};