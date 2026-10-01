"use client"
import { useState } from "react"
import Modal from "./Modal"
import { useAuthModal } from "@/store/useAuthModalStore"
import Input from "../ui/input"
import Button from "../ui/Button"
import { FcGoogle } from "react-icons/fc"


interface LoginValues {
    email:string,
    password:string
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>

export default function LoginModal() {
    const {openRegister, isLoginOpen, closeLogin} = useAuthModal();
    const [values, setValues] = useState<LoginValues>({
        email:"",
        password:"",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] =useState<LoginErrors>({})
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value, name}=e.target;

        setValues((prev)=>({
            ...prev,
            [name]:value
        }));
        setErrors((prev) =>({
            ...prev,
            [name]:undefined
        }))
    };

    const validate=() =>{
        const newErrors:LoginErrors={};

        //validate email
        if(!values.email.trim()){
            newErrors.email="Email is required!";
        } else if(!/^\S+@\S+\.\S+$/.test(values.email)){
            newErrors.email="Invalid email address";
        }

        //validate password field
        if(!values.password.trim()){
            newErrors.password="Password is required";
        } else if(values.password.length < 6){
            newErrors.password="Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return (
        <Modal title="Login" onClose={closeLogin} isOpen={isLoginOpen}>
            {/* header */}
            <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
                <p className="text-sm text-gray-500">Login to your account</p>
            </div>

            <form className="space-y-8">
                <Input 
                  id="login-email" 
                  name="Email" 
                  label="Email" 
                  value={values.email} 
                  onChange={handleChange} 
                  error={errors.email}
                  disabled={loading}
                />
                <Input 
                  id="login-password" 
                  name="password" 
                  label="password" 
                  value={values.password} 
                  onChange={handleChange} 
                  error={errors.password}
                  disabled={loading}
                />
                <Button fullWidth loading={loading} type="submit">
                    Continue
                </Button>
            </form>
            
            {/* divider */}
            <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-gray-400">
                    Or
                </span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Button variant="outline" fullWidth 
            disabled={loading} icon={<FcGoogle size={20}/>}>
                Continue with Google
            </Button>

            <p className="text-gray-400 text-center text-sm mt-6">
                Don&apos;t have an account?{" "}
                <span className="text-primary font-semibold cursor-pointer
                hover:underline" onClick={openRegister}>
                    Register
                </span>
            </p>
        </Modal>
    )
}