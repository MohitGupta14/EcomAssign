import Head from "next/head";
import { useState } from "react";
import Navbar from "@component/components/Navbar";
import LoginForm from "@component/components/Login";
import RegisterForm from "@component/components/Register";

export default function Home() {
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
