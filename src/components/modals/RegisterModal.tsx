"use client"
import { useState } from "react"
import Modal from "./Modal"
import { useAuthModal } from "@/store/useAuthModalStore"
import Button from "../ui/Button"
import Input from "../ui/input"
import { FcGoogle } from "react-icons/fc"


interface RegisterValues {
    name:string,
    email:string,
    password:string
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>


export default function RegisterModal() {
    const {openLogin, isRegisterOpen, closeRegister} = useAuthModal();
    
    const [values, setValues] = useState<RegisterValues>({
        name:"",
        email:"",
        password:"",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] =useState<RegisterErrors>({})

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
        const newErrors:RegisterErrors={};

        // validate name field
        if(!values.name.trim()){
            newErrors.name="name is required";
        } else if(values.name.length < 6){
            newErrors.name="name must be at least 6 characters long";
        }

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
        <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
             {/* header */}
             <div className="mb-6 space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
                <p className="text-sm text-gray-500">Create an account</p>
            </div>

            <form className="space-y-8">
                <Input 
                  id="Register-name" 
                  name="Name" 
                  label="Name" 
                  value={values.name} 
                  onChange={handleChange} 
                  error={errors.name}
                  disabled={loading}
                />
                <Input 
                  id="Register-email" 
                  name="Email" 
                  label="Email" 
                  value={values.email} 
                  onChange={handleChange} 
                  error={errors.email}
                  disabled={loading}
                />
                <Input 
                  id="Register-password" 
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
                Already have an account?{" "}
                <span className="text-primary font-semibold cursor-pointer
                hover:underline" onClick={openLogin}>
                    Register
                </span>
            </p>
            
        </Modal>
    )
}