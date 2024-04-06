import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "@component/utils/api";
import Navbar from "@component/components/Navbar";
import RegisterForm from "@component/components/Register";
import LoginForm from "@component/components/Login";
import axios from "axios";

export default function Home() {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  };
  
  const create = api.post.create.useQuery(
    userData
  );

  const [login, setLogin] = useState(false);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {login ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin} />}
    </div>
  );
}
