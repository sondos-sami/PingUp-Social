import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import {} from "@heroui/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)"
      ),
    rePassword: z.string(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().regex(/^(female|male)$/, "Must select male or female"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  let navigate = useNavigate();
  async function submit(formData) {
    try {
      const response = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        formData
      );
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reset();
      setInterval(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error?.response?.data.error);
      toast.error(error.response?.data?.error || "Registration failed", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div className="max-w-md  p-5 mx-auto my-5">
      <Form
        onSubmit={handleSubmit(submit)}
        className="bg-white  p-10 rounded-2xl shadow-2xl w-full"
      >
        <ToastContainer />
        <h1 className=" font-bold text-2xl mx-auto">Register Form</h1>
        <Input
          {...register("name")}
          label="Name"
          labelPlacement="outside"
          placeholder="Enter your username"
          isInvalid={Boolean(errors?.name?.message)}
          errorMessage={errors?.name?.message}
        />

        <Input
          {...register("email")}
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your Email"
          isInvalid={Boolean(errors?.email?.message)}
          errorMessage={errors?.email?.message}
        />

        <Input
          {...register("password")}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          isInvalid={Boolean(errors?.password?.message)}
          errorMessage={errors?.password?.message}
        />

        <Input
          {...register("rePassword")}
          label="Confirm Password"
          labelPlacement="outside"
          placeholder="Repeat your password"
          type="password"
          isInvalid={Boolean(errors?.rePassword?.message)}
          errorMessage={errors?.rePassword?.message}
        />

        <Input
          {...register("dateOfBirth")}
          label="Date Of Birth"
          labelPlacement="outside"
          type="date"
          isInvalid={Boolean(errors?.dateOfBirth?.message)}
          errorMessage={errors?.dateOfBirth?.message}
        />

        <Select
          isInvalid={Boolean(errors?.gender?.message)}
          errorMessage={errors?.gender?.message}
          label="Gender"
          labelPlacement="outside"
          placeholder="Select a Gender"
          {...register("gender")}
        >
          <SelectItem key={"female"} value="female">
            Female
          </SelectItem>
          <SelectItem key={"male"} value="male">
            Male
          </SelectItem>
        </Select>

        <Button
          type="submit"
          className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800"
        >
          Register New Account
        </Button>
        <p className="mx-auto">
          Do have an account?
          <Link to="/login" className="text-blue-700">
            {" "}
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default RegisterPage;
