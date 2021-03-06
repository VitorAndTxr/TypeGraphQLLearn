//import { Min } from "class-validator";
import { ClassType, InputType, Field } from "type-graphql";

//Exemplo de mixin
export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {

    @InputType({isAbstract: true})
    class PasswordInput extends BaseClass{
        @Field()
        password: string;
    }
    return PasswordInput
};