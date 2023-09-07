import NextAuth from "next-auth/next";
import { jwt } from "next-auth/next";

declare module "next-auth" {
    interface User {
        _id: string;
        id: string;
        admin_roles: string;
        password: string;
        full_name: string;
        email_address: string;
        is_active: boolean;
        session_history: any[]; // You can specify the actual type of session history data
        username: string;
        login_attempt: number;
    }

    interface Session {
        user: User;
        access_token: string;
    }
}

declare module "next-auth/jwt" {
    interface User {
        _id: string;
        id: string;
        admin_roles: string;
        password: string;
        full_name: string;
        email_address: string;
        is_active: boolean;
        session_history: any[]; // You can specify the actual type of session history data
        username: string;
        login_attempt: number;
    }

    interface JWT {
        user: User;
        access_token: string;
    }
}
