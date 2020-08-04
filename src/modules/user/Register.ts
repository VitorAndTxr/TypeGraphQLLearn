import { Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { createConfirmationUrl } from "../utils/createConfirmationEmail";
import { sendEmail } from "../utils/sendEmail";

@Resolver()
export class RegisterResolver{
    //()=> tipo do retorno
    @UseMiddleware(isAuth)
    @Query(()=> String)
    async hello(){
        return "Hello World!";
    }


    @Mutation(() => User)
    async register(
        @Arg("data") {email, password, firstName, lastName}: RegisterInput
    ): Promise<User>{
        const hashedPassword = await bcrypt.hash(password, 12).catch();

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save().catch();

        if(process.env.NODE_ENV !== 'test'){
            await sendEmail(user.email,createConfirmationUrl(user.id));
        }

        return user;
    }
    
}