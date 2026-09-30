import {
    Field,
    GraphQLISODateTime,
    ID,
    ObjectType,
    registerEnumType
} from "type-graphql";


export enum Role {
    owner = "owner",
    admin = "admin",
    user = "user",
    viewer = "viewer",
}

registerEnumType(Role, {
    name: "Role",
    description: "The role of the user",
});

@ObjectType()
export class UserModel {

    @Field(() => ID)
    id!: string

    @Field(() => String)
    name!: string

    @Field(() => String)
    email!: string

    @Field(() => String, { nullable: true })
    password?: string | null

    @Field(() => Role, { nullable: true })
    role?: string | null

    @Field(() => GraphQLISODateTime)
    createdAt!: Date

    @Field(() => GraphQLISODateTime)
    updatedAt!: Date
}