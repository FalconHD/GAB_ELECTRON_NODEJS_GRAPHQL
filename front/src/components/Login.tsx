import { LOGIN } from "../graphql/schema";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    visa: "",
    code: "",
  });
  const [mutate, { data, loading, error }] = useMutation(LOGIN);

  const submitLogin = async (e: any) => {
    e.preventDefault();
    const res = await mutate({
      variables: {
        input: userData,
      },
    });
    if (!res.errors) navigate("/");
  };

  if (loading)
    toast((t) => (
      <span>
        <b>YOU ARE OFFLINE</b>
        <button
          className="px-2 ml-10 rounded-lg bg-red-300"
          onClick={() => toast.dismiss(t.id)}
        >
          close
        </button>
      </span>
    ));

  return (
    <div className="p-6 max-w-sm bg-red-200 w-[50%] flex flex-col justify-between  rounded-lg border border-gray-200 shadow-md">
      <div className="mb-6">
        <label
          htmlFor="username-success"
          className="block mb-2 text-sm font-medium text-gray-700 "
        >
          ENTER CARD NUMBER
        </label>
        <input
          type="text"
          value={userData.visa}
          onChange={(e) => setUserData({ ...userData, visa: e.target.value })}
          id="username-success"
          className="bg-green-50 border border-blue-500 text-black placeholder-black placeholder-opacity-60 text-sm rounded-lg block w-full p-2.5 dark:bg-blue-100 dark:border-blue-400 outline-none"
          placeholder="4566****************"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="username-success"
          className="block mb-2 text-sm font-medium text-gary-700 "
        >
          CODE
        </label>
        <input
          type="text"
          value={userData.code}
          onChange={(e) => setUserData({ ...userData, code: e.target.value })}
          id="username-success"
          className="bg-green-50 border border-blue-500 text-black placeholder-black placeholder-opacity-60 text-sm rounded-lg block w-full p-2.5 dark:bg-blue-100 dark:border-blue-400 outline-none"
          placeholder="****"
        />
      </div>
      <button
        onClick={submitLogin}
        type="button"
        className="text-black font-semibold bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 hover:bg-gradient-to-br focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80  rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        ENTER
      </button>
    </div>
  );
};
