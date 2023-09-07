"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

// Define form data structure
type FormData = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const { data: session } = useSession();
    const [error, setError] = useState("");

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        const email_address = data.email;
        const password = data.password;

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email_address,
                password, // Pass the form data to the signIn function
            });

            if (res?.error) {
                console.log("error", res.error);
                // Handle login error here if needed
                setError("Invalid credential");
                return;
            }
            router.replace("/profile");
        } catch (err) {}
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mx-auto mt-20">
            <h1 className="text-2xl text-center font-semibold mb-4">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="email"
                            />
                        )}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="********"
                            />
                        )}
                    />
                </div>
                {error ? <p className="text-red">{error}</p> : ""}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
