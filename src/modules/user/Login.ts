import { Resolver, Mutation, Arg, Ctx, Query} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

//classe responsável pela verificação do Login
@Resolver()
export class LoginResolver{

    @Mutation(() => User, {nullable: true})
    async login(
        @Arg("email") email: string, 
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User| null> {
        const user = await User.findOne({where: {email}});

        //usuario existe?
        if(!user){
            return null;
        }

        //senha correta?
        const valid = await bcrypt.compare(password, user.password);

        if(!valid){
            return null;
        }

        //usuário confirmou o email?
        if(!user.confirmed){
            return null;
        }

        ctx.req.session!.userId = user.id;

        return user;
    }
    @Query(()=> User, { nullable: true })
    async userLogged(@Ctx() ctx: MyContext): Promise<User | undefined>{
        if(!ctx.req.session!.userId){
            return undefined;
        }
        return await User.findOne(ctx.req.session!.userId);
    }
    
}