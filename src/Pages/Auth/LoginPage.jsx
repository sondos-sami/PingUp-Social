import { Form, Input, Button,Select, SelectItem  } from "@heroui/react";
import { useForm } from "react-hook-form";
import { } from "@heroui/react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
 
const schema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    
  })
 
 

function LoginPage() {
  
  const {
    register,
    handleSubmit,
    formState: { errors,reset },
  } = useForm({
    resolver: zodResolver(schema),
 
  });
let navigate=useNavigate();
  async function submit(formData) {
    try {
      const {data} = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        formData,
        
      );
      
      localStorage.setItem("token",data.token);
 
       toast.success('login successful!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    
     setInterval(()=>{
      navigate("/")
     },1000)
    
    } catch (error) {
      console.log(error?.response?.data.error)
      toast.error(error.response?.data?.error || 'Registration failed', {
        position: "top-center",
        autoClose:1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    
  }

  return (
    <div className="max-w-md p-5 mx-auto my-5">
            <ToastContainer />
            
      <Form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-6 rounded-2xl shadow-2xl space-y-4"
      >
      
<h1 className=" font-bold text-2xl mx-auto">
  Login Form
</h1>

          <Input
            {...register("email")}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your Email"
            isInvalid={Boolean(errors?.email?.message) }
            errorMessage={errors?.email?.message}
          />
         
       
       


          <Input
            {...register("password")}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
            isInvalid={Boolean(errors?.password?.message) }
            errorMessage={errors?.password?.message}
          />
 
       
       

    

        <Button
          type="submit"
          className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800"
        >
         Login
        </Button>
        <p className="mx-auto">Don’t have an account?
            <Link to='/register' className="text-blue-700">Sign up</Link>
</p>
      
      </Form>
    </div>
  );
}

export default LoginPage;
