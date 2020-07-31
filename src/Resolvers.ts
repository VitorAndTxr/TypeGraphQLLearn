import { RegisterResolver } from "./modules/user/Register"
import { LoginResolver } from "./modules/Login";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

export const Resolvers = [        
    RegisterResolver, 
    LoginResolver,
    ConfirmUserResolver
]