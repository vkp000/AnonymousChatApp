// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod"
// // import { z } from "zod";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
// import { toast } from "sonner";
// import { useRouter } from 'next/navigation';
// import { signUpSchema } from "@/schemas/signUpSchema";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// const Page = () => {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmiting] = useState(false);
//   const router = useRouter();

//   const debounced = useDebounceCallback(setUsername, 1000)

//   // zod implementation
//   const form =
//     useForm <
//     z.infer<typeof signUpSchema>>({
//       resolver: zodResolver(signUpSchema),
//       defaultValues: {
//         username: "",
//         email: "",
//         password: "",
//       },
//     });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (username) {
//         setIsCheckingUsername(true);
//         setUsernameMessage("");
//         try {
//           const response = await axios.get(
//             `/api/check-Username-unique?username=${username}`
//           );
//           setUsernameMessage(response.data.message);
//         } catch (error) {
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message ?? "Error checking username"
//           );
//         } finally {
//           setIsCheckingUsername(false);
//         }
//       }
//     };
//   }, [username]);

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmiting(true);
//     try {
//       const response = await axios.post<ApiResponse>("/api/sign-up", data);
//       toast({
//         title: "Success",
//         description: response.data.message,
//       });
//       router.replace(`/verify/${username}`);
//       setIsSubmiting(false);
//     } catch (error) {
//       console.error("Error in Sign Up", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message
//       toast({
//         title:"Signup failed",
//         description: errorMessage,
//         variant: "destructive"
//       })
//        setIsSubmiting(false)
//       console.log(axiosError);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join Mystery Message
//           </h1>
//           <p className="mb-4"> Sign to start your anonymous adventure</p>
//         </div>
//             <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="username"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                   <Input placeholder="username"
//                    {...field}
//                    onChange={(e) => {
//                     field.onChange(e)
//                     debounced(e.target.value)
//                    }}
//                     />

//                     </FormControl>
//                     {isCheckingUsername && <Loader2 className="animate-spin"/>}
//                     <p className={`text-sm ${usernameMessage === 'Username is available' ? 'text-green-500' : 'text-red-500'}`}>
//                         test {usernameMessage}
//                     </p>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                   <Input placeholder="email"
//                    {...field}

//                     />
//                     </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                   <Input type="password" placeholder="password"
//                    {...field}

//                     />
//                     </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit"  aria-disabled={isSubmitting}>
//               {
//                 isSubmitting ? (
//                   <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                 </>
//                 ) : ( 'Signup' )

//               }
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//         <p>
//         Already a member?{' '}
//         <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//           Sign in
//         </Link>
//         </p>
//         </div>
//       </div>
//     </div>
//   )
// };

// export default Page;

"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedUsername] = useDebounce(username, 3000);

  const router = useRouter();
  //   const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage(""); // Reset message
        try {
          console.log("debouncedUsername =", debouncedUsername);
          console.log("typeof debouncedUsername =", typeof debouncedUsername);

          const response = await axios.get<ApiResponse>(
            `/api/check-Username-unique?username=${debouncedUsername}`
          );
          let message = response.data.message;

          setUsernameMessage(message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      //   toast({
      //     title: 'Success',
      //     description: response.data.message,
      //   });

      toast.success(response.data.message);

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage =
        axiosError.response?.data.message ??
        "There was a problem with your sign-up. Please try again.";

      //   toast({
      //     title: 'Sign Up Failed',
      //     description: errorMessage,
      //     variant: 'destructive',
      //   });
      toast.error(errorMessage);

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="email" />
                  <p className="text-muted text-gray-400 text-sm">
                    We will send you a verification code
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
