"use client";

const TransactionSummaryTable = React.lazy(
  () => import("@/components/TransactionSummaryTable/TransactionSummaryTable")
);
import { useTransactions } from "@/hooks/useTransactions";
import { useEurRates } from "@/hooks/useEurRates";
import Loader from "@/components/Loader/Loader";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
