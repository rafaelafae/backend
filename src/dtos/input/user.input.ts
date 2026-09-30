import { Field, InputType } from "type-graphql";
import { Role } from "../../models/user.model";


@InputType()
export class CreateUserInput {

    @Field(() => String)
    name!: string;

    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}

@InputType()
export class UpdateUserInput {

    @Field(() => String, { nullable: true })
    name!: string | null;

    @Field(() => String, { nullable: true })
    password!: string | null;

    @Field(() => Role, { nullable: true })
    role!: Role | null;
}