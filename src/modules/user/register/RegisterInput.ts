import {} from "class-validator";
import { InputType, Field } from "type-graphql";
import { PasswordMixin } from "../../shared/PasswordMixin";

@InputType()
export class RegisterInput extends PasswordMixin(class{}){
    @Field()
    firstName: string;

    @Field()
    lastName: string;
    
    @Field()
    email: string;
}