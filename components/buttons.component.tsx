"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    const router = useRouter();
    const { data: session } = useSession(); // Use useSession hook to check if the user is authenticated
    const handleSubmit = async () => {
        router.push("/login");
    };

    return (
        <button style={{ marginRight: 10 }} onClick={handleSubmit}>
            Sign in
        </button>
    );
};

export const RegisterButton = () => {
    return (
        <Link href="/register" style={{ marginRight: 10 }}>
            Register
        </Link>
    );
};

export const LogoutButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};

export const ProfileButton = () => {
    return <Link href="/profile">Profile</Link>;
};
