import {useState} from "react";
import {BookOpen, UserPlus } from "lucide-react";
import { Button, TextField } from '@mui/material';
import type { authField } from "../../types/authField.type";
import { UserRegisterFields } from "../../constant/register";
import {GoogleIcon} from "../../components/googleIcon";
import { AuthService } from "../../api/Services/AuthService";
import { useAppNavigate } from "../../hooks/useNavigate";

const UserRegister = () => {

    const navigate=useAppNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const {
            name,
            email,
            password,
            confirmPassword,
        } = formData;

        if (!name || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (password !== confirmPassword) { //add toast
            alert('Passwords do not match');
            return;
        }

        //Add the proper ZOD VALIDATION

        const res = await AuthService.register({name,email,password,confirmPassword });

        if(!res.success){
            return false;
        }

        navigate("/login");
        return res.success;

    };


    const handleGoogleAuth=async ()=>{
        //import from .env
        window.location.href ="http://localhost:4000/google/auth";
        
        return true;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" >
            <div className="bg-teal-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                Boggy
            </span>
            </div>
            <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-medium text-teal-600 hover:text-teal-500">
                Sign in
            </button>
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-100">
            <form className="space-y-5" onSubmit={handleRegister}>
                {UserRegisterFields.map(
                        (field: authField, index: number) => (
                            <TextField
                                key={index}
                                id={`register-${field.name}`}
                                fullWidth
                                label={field.placeholder}
                                type={field.type}
                                name={field.name}
                                variant="outlined"
                                size="medium"
                                value={
                                    formData[
                                        field.name as keyof typeof formData
                                    ]
                                }
                                onChange={handleChange}
                            />
                        )
                    )}

                <Button 
                
                fullWidth 
                variant="contained" 
                size="large"
                startIcon={<UserPlus size={20} />}
                disableElevation
                sx={{ bgcolor: '#0d9488', '&:hover': { bgcolor: '#0f766e' }, textTransform: 'none', fontWeight: 600, py: 1.5, mt: 2 }}

                type="submit"
                >
                Register
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
                <Button 
                type="button"
                onClick={handleGoogleAuth}
                variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ color: '#475569', borderColor: '#cbd5e1', textTransform: 'none', fontWeight: 600, py: 1 }}>
                    Google
                </Button>
                <div className="grid grid-cols-2 gap-3">
                    {/* <Button variant="outlined" fullWidth startIcon={<Github size={20} />} sx={{ color: '#475569', borderColor: '#cbd5e1', textTransform: 'none', fontWeight: 600, py: 1 }}>
                    GitHub
                    </Button> */}
                    {/* <Button variant="outlined" fullWidth startIcon={<Facebook size={20} className="text-blue-600" />} sx={{ color: '#475569', borderColor: '#cbd5e1', textTransform: 'none', fontWeight: 600, py: 1 }}>
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

export default UserRegister