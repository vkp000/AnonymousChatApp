import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { IBM_Plex_Mono } from "next/font/google";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymous message | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
        })
        return {success: true, message: 'Succesfully to send verification email'}
        
    } catch (emailError) {
        console.error("Error sending verification email ", emailError);
        return {success: false, message: 'Failed to send verification email'}
        
    }
}