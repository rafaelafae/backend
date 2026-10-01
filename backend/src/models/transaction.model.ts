import { Field, Float, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { CategoryModel } from "./category.model";


@ObjectType()
export class TransactionModel {

    @Field(() => ID)
    id!: string

    @Field(() => String)
    title!: string

    @Field(() => Float)
    amount!: number

    @Field(() => String)
    type!: string

    @Field(() => String)
    categoryId!: string

    @Field(() => CategoryModel, { nullable: true })
    category?: CategoryModel | null;

    @Field(() => String)
    userId!: string

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}