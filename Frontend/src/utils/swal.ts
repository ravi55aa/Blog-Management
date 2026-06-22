import Swal from "sweetalert2";

export const logoutSWAL = async () => {

        const result = await Swal.fire({
            title: "Logout?",
            text: "You will need to login again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d9488",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });
    
        if (!result.isConfirmed) {
            return false;
        }

        return true;
    }

export const deleteSWAL = async () => {

        const result = await Swal.fire({
            title: "Delete?",
            text: "Are you sure want to delete this Blog ?",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#0d9488",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, DELETE",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });
    
        if (!result.isConfirmed) {
            return false;
        }

        return true;
    }