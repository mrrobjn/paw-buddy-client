"use client";
import { apiRegister } from "@/apis";
import { Button, Loading } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUp = () => {
  const [pageState, setPageState] = useState({ error: "", isLoading: false });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProp>();

  const handleChange = (name: string, value: any) => {
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<RegisterProp> = async (data) => {
    handleChange("isLoading", true);
    try {
      if (data.password !== data.confirmPassword) {
        handleChange("error", "Confirm password do not match");
      } else {
        const resData = await apiRegister(data);
        if (!resData.success) {
          handleChange("error", resData.message);
        } else {
          handleChange("error", "");
          toast.success("Register successfully!!!");
          router.push("/login");
        }
      }
    } catch (error: any) {
      handleChange("error", error.message);
    }
    handleChange("isLoading", false);
  };

  return (
    <form
      className="bg-secondary p-9 shadow-lg rounded-xl w-[500px] h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-semibold">
        <span className="font-bold text-blue">Create an Account</span>
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
          className="w-full p-3 mt-2 border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      <div className="mt-7">
        <label htmlFor="name">Full name</label>
        <br />
        <input
          id="name"
          type="text"
          placeholder="Type your full name"
          disabled={pageState.isLoading}
          {...register("fullName", { required: true })}
          className="w-full p-3 mt-2 border-2 rounded-lg outline-none focus:border-primary transition-all"
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
      <div className="mt-4">
        <label htmlFor="confirm_password">Confirm password</label>
        <br />
        <input
          id="confirm_password"
          type="password"
          placeholder="Type your password"
          disabled={pageState.isLoading}
          {...register("confirmPassword", { required: true })}
          className="w-full p-3 mt-2  border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      {pageState.error && (
        <p className="bg-danger p-3 text-danger border-2 border-danger mt-4 rounded-lg">
          {pageState.error}
        </p>
      )}
      <div className="mt-4">
        <Button style={{ width: "100%" }} type="submit" btnType="primary">
          {pageState.isLoading ? (
            <Loading size={30} color="#fff" />
          ) : (
            "Register"
          )}
        </Button>
      </div>
      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <Link href={"/login"} className="font-bold text-blue">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
