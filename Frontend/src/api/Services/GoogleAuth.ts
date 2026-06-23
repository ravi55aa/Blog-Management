    export const handleGoogleAuth=async ()=>{

        window.location.href = import.meta.env.VITE_GOOGLE_AUTH;
        
        return true;
    }