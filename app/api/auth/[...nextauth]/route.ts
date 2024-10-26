import { connect } from "@/client/db";
import user from "@/Model/user";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


declare module "next-auth"{
       interface Session{
          user:{
            id:string
          }
          & DefaultSession["user"]
       }
}


const handler=NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async signIn(params){
            if(!params.user.email){
                return false;

            }
            await connect();
            const isUserPresent=await user.findOne({
                email:params.user.email ?? ""

            })
            if(isUserPresent){
                return true;
            }
            console.log("error");
            await user.create({
                name:params.user.name,
                email:params.user.email
            })
            console.log("error");
            return true;


        },
        async session({session}){
          await connect();
          const isUser=await user.findOne({
            email:session.user?.email ?? ""

          });
          if(!isUser){
            return session;
          }
      
          session.user.id=isUser.id;
          return session;

        }
    }




})
export {handler as GET, handler as POST}