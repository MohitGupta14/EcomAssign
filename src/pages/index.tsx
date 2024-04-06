import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "@component/utils/api";
import Navbar from "@component/components/Navbar";
import RegisterForm from "@component/components/Register";
import LoginForm from "@component/components/Login";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
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
