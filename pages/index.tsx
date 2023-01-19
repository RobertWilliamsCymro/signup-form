import { Heading } from "./components/heading";
import { SignUpForm } from "./components/form";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <title>Sign up</title>
      <main className="flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-400 bg-cover bg-[url(../public/bg-intro-mobile.png)] sm:bg-[url(../public/bg-intro-desktop.png)]">
        <Heading />
        <SignUpForm />
      </main>
    </>
  );
};

export default Home;
