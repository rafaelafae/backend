import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { IsAuth } from "../middlewares/auth.middleware";
import { AuthenticatedContext } from "../graphql/context";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionModel } from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";


@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
    private transactionService = new TransactionService();

    @Mutation(() => TransactionModel)
    async createTransaction(
        @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
        @Ctx() ctx: AuthenticatedContext
    ): Promise<TransactionModel> {
        return this.transactionService.createTransaction(ctx.user, data);
    };

    @Mutation(() => TransactionModel)
    async updateTransaction(
        @Arg("id", () => String) id: string,
        @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
        @Ctx() ctx: AuthenticatedContext
    ): Promise<TransactionModel> {
        return this.transactionService.updateTransaction(id, ctx.user, data);
    };

    @Mutation(() => Boolean)
    async deleteTransaction(
        @Arg("id", () => String) id: string,
        @Ctx() ctx: AuthenticatedContext
    ): Promise<boolean> {
        return this.transactionService.deleteTransaction(id, ctx.user);
    };

    @Query(() => [TransactionModel])
    async listTransactions(
        @Ctx() ctx: AuthenticatedContext
    ): Promise<TransactionModel[]> {
        return this.transactionService.listTransactions(ctx.user);
    };
}