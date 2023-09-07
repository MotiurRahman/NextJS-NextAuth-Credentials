"use client";

import { signOut, useSession } from "next-auth/react";

const Profile = () => {
    const { data: session } = useSession();
    console.log(session);
    return (
        <div>
            <h1>ID: {session?.user._id}</h1>
            <h1>Name: {session?.user.full_name}</h1>
            <h1>Email: {session?.user.email_address}</h1>
            <button style={{ marginRight: 10 }} onClick={() => signOut()}>
                Sign Out
            </button>
        </div>
    );
};

export default Profile;
