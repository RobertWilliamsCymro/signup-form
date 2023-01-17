import { Heading } from "./components/heading";
import { SignUpForm } from "./components/form";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
        <title>Sign up</title>
        <main>
          <div className="flex justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-300 bg-cover bg-[url(../public/bg-intro-mobile.png)] sm:bg-[url(../public/bg-intro-desktop.png)]">
            <div className="flex flex-col sm:flex-row w-full">
              <Heading />
              <SignUpForm />
            </div>
          </div>
        </main>
    </>
  );
};

export default Home;
