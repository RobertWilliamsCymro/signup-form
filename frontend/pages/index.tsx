import type { NextPage } from "next";
import { Heading } from "./components/heading";
import { Form } from "./components/form";
import { Banner } from "./components/banner";

const Home: NextPage = () => {
  return (
    <>
    <title>Sign up</title>
      <div className="flex justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-300 bg-cover bg-[url(../public/bg-intro-mobile.png)] sm:bg-[url(../public/bg-intro-desktop.png)]">
        <div className="flex flex-col sm:flex-row w-full">
          <Heading />      
          <Form />   
        </div>
      </div>
    </>
  );
};

export default Home;