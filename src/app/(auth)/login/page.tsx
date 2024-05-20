"use client";
import { apiGetCurrent } from "@/apis";
import { Button, Loading } from "@/components";
import { useAppDispatch } from "@/redux/hook";
import { loginUser } from "@/redux/user/async";
import { getCurrent } from "@/redux/user/userSlice";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const [pageState, setPageState] = useState({ error: "", isLoading: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>();
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: any) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<LoginProp> = async (data) => {
    handleChange("isLoading", true);
    try {
      const resData: any = (await dispatch(loginUser(data))).payload;
      if (!resData.success) {
        handleChange("error", resData.message);
      } else {
        const data = await apiGetCurrent();
        dispatch(getCurrent(data.data));
      }
    } catch (error: any) {
      handleChange("error", "Something wrong!");
    }
    handleChange("isLoading", false);
  };

  return (
    <form
      className="bg-secondary p-9 shadow-lg rounded-xl w-[500px] h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-semibold">
        Welcome <br />
        to <span className="font-bold text-blue">Paw Buddy</span>
      </h1>
      <div className="mt-7">
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          placeholder="Type your email"
          disabled={pageState.isLoading}
          {...register("email", { required: true })}
          className="w-full p-3 mt-2  border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Type your password"
          disabled={pageState.isLoading}
          {...register("password", { required: true })}
          className="w-full p-3 mt-2  border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      {pageState.error && (
        <p className="bg-danger p-3 text-danger border-2 border-danger mt-4 rounded-lg">
          {pageState.error}
        </p>
      )}
      <div className="flex justify-between items-center mt-4">
        <div>
          <input id="remember_me" type="checkbox" className="mr-2" />
          <label htmlFor="remember_me">Remember me</label>
        </div>
        <Link
          className="hover:underline underline-offset-4"
          href={"/resetpassword"}
        >
          Forgot your password?
        </Link>
      </div>
      <div className="mt-4">
        <Button style={{ width: "100%" }} disable={pageState.isLoading} type="submit" btnType="primary">
          {pageState.isLoading ? <Loading size={30} color="#fff" /> : "LOGIN"}
        </Button>
      </div>
      <div className="text-center mt-4">
        <p>
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} className="font-bold text-blue">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
