import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function GET(request:Request) {
    await dbConnect()
     const session = await getServerSession(authOptions)
     const _user: User = session?.user as User
     if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authencated"
            },
            { status : 401}
        )
     }

     const userId = new mongoose.Types.ObjectId(user._id);
     try {
        const user = await UserModel.aggregate([
            { $match: {id: userId} },
            {$unwind: '$messages'},
            {$sort: {'messages.createdAt': -1}},
            {$group: {_id: '$_id', messages: {$push: '$messages'}}}
        ])

        if(!user || user.length === 0){
            return Response.json(
                {
                    success: false,
                    message: "Username not found"
                },
                { status : 401}
            )
        }
        return Response.json(
                {
                    success: true,
                    messages: user[0].messages
                },
                { status : 200}
            )
     } catch (error) {
        console.log("an unexpected error occured:"), error;
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            { status : 500 }
        )
     }
}