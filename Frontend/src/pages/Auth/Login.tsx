import {useState} from "react";
import { BookOpen, LogIn } from "lucide-react";
import type { authField } from "../../types/authField.type";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { LoginFields } from "../../constant/register";
import {GoogleIcon} from "../../components/googleIcon";
import { AuthService } from "../../api/Services/AuthService";
import { useAppNavigate } from "../../hooks/useNavigate";

const SignIn = () => {
    const [loginData,setLoginData]=useState<{email:string,password:string}>({email:"",password:""});

    const navigate=useAppNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        const element:HTMLElement|null=document.getElementById(`login-span-${name}`);

        if(element && element?.innerText.length ){
            element.innerText="";
        }

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async ( e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(!loginData.email?.trim()){ //throw an error here
            return false;
        }

        if(!loginData.password?.trim()){
            return false;
        }

        const res = await AuthService.login(loginData);

        if(!res.success){
            //handle field error
            return res.success;
        }

        navigate("/blog/dashboard");
        return res.success;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
            <div className="bg-teal-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                Boggy
            </span>
            </div>
            <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            {/* <button onClick={() => onNavigate('register')} className="font-medium text-teal-600 hover:text-teal-500">
                Register now
            </button> */}
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-100">
            <form className="space-y-5" onSubmit={handleLogin}>
                {LoginFields.map((field: authField, index: number) => (
                    <>
                <TextField 
                    key={index} 
                    id={`login-${field.name}`}
                    fullWidth
                    label={field.placeholder} 
                    type={field.type} 
                    name={field.name} 
                    variant="outlined" 
                    value={
                            loginData [
                                field.name as keyof typeof loginData
                            ]
                    }
                    onChange={handleChange}
                    size="medium"
                />
                <span id={`login-span-${field.name}`} className="text-red-500 text-sm"></span>
                </>
                ))}

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Remember me</label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-teal-600 hover:text-teal-500">Forgot your password?</a>
                </div>
                </div>

                <Button
                fullWidth 
                variant="contained" 
                size="large"
                type="submit"
                startIcon={<LogIn size={20} />}
                disableElevation
                sx={{ bgcolor: '#0d9488', '&:hover': { bgcolor: '#0f766e' }, textTransform: 'none', fontWeight: 600, py: 1.5 }}
                >
                Sign in
                </Button>
            </form>

            <div className="mt-6">
                <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ color: '#475569', borderColor: '#cbd5e1', textTransform: 'none', fontWeight: 600, py: 1 }}>
                    Google
                </Button>
                <div className="grid grid-cols-2 gap-3">
                    {/* <Button variant="outlined" fullWidth startIcon={<Github size={20} />} sx={{ color: '#475569', borderColor: '#cbd5e1', textTransform: 'none', fontWeight: 600, py: 1 }}>
                    GitHub
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Facebook size={20} className="text-blue-600" />} sx={{ color: '#475569', borderColor: '#cbd5e1', textTransform: 'none', fontWeight: 600, py: 1 }}>
                    Facebook
                    </Button> */}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default SignIn;