import { ClassType, InputType, Field } from "type-graphql";

//Exemplo de mixin
export const ExempleMixin = <T extends ClassType>(BaseClass: T) =>{
    @InputType()
    class ExempleClass extends BaseClass{
        @Field()
        ok: boolean;
    }
    return ExempleClass
};