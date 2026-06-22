import { CircularProgress } from '@mui/material'

const Loader = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
            <CircularProgress
            sx={{
                color: "#0d9488",
            }}
            />

            <p className="mt-4 text-slate-500">
            Loading...
            </p>
        </div>
        </div>
    )
}

export default Loader