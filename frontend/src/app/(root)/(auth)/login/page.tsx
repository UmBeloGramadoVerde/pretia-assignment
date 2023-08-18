"use client";

import React from "react";
import { useForm } from "react-hook-form";
import LoginComponent from "./LoginComponent";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex justify-center">
      <LoginComponent />
    </div>
  );
}
