import React from "react";
import { Login } from "../../components/Login";

export const Home = () => {
  return (
    <div className=" flex flex-col justify-center items-center w-full p-28 gap-6">
        <h1 className="text-3xl font-bold">ENTER YOUR CREDENTIALS</h1>
      <Login />
    </div>
  );
};
 