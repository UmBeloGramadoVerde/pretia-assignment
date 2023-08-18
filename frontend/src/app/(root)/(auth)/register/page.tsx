"use client";

import React from "react";
import { useForm } from "react-hook-form";
import RegisterComponent from "./RegisterComponent";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="flex justify-center">
      <RegisterComponent />
    </div>
  );
}
