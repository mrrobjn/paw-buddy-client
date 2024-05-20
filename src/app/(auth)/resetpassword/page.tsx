"use client";
import { Button, Loading } from "@/components";
import Link from "next/link";
import { useState } from "react";

const ResetPassword = () => {
  const [pageState, setPageState] = useState({ error: "", isLoading: false });

  return (
    <form className="bg-secondary p-9 shadow-lg rounded-xl w-[500px] h-fit">
      <h1 className="text-4xl font-semibold">Recover password</h1>
      <div className="mt-7">
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          placeholder="Type your email"
          // disabled={pageState.isLoading}
          // {...register("email", { required: true })}
          className="w-full p-3 mt-2 border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      <div className="mt-7">
        <label htmlFor="email">Old password</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Type your old password"
          // disabled={pageState.isLoading}
          // {...register("email", { required: true })}
          className="w-full p-3 mt-2 border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      <div className="mt-7">
        <label htmlFor="email">New password</label>
        <br />
        <input
          id="new_password"
          type="password"
          placeholder="Type your new password"
          // disabled={pageState.isLoading}
          // {...register("email", { required: true })}
          className="w-full p-3 mt-2 border-2 rounded-lg outline-none focus:border-primary transition-all"
        />
      </div>
      <div className="mt-4">
        <Button type="submit" btnType="primary" style={{ width: "100%" }}>
          {pageState.isLoading ? (
            <Loading size={30} color="#fff" />
          ) : (
            "Reset password"
          )}
        </Button>
      </div>
      <div className="text-center mt-4">
        <p>
          Finish yet?{" "}
          <Link href={"/login"} className="font-bold text-blue">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ResetPassword;
