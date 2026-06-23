import axios from "axios";

export const axiosBaseURL = axios.create({

    baseURL:import.meta.env.VITE_BACKEND_URL,
    
    withCredentials:true,
    
    timeout:50000, //request time in milliseconds
    
    headers : {
        'Content-Type': 'application/json'
    }
    
});

//
axiosBaseURL.interceptors.request.use(config => {
    
    // const token = localStorage.getItem('authToken'); // Retrieve token dynamically
    
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;

}, error => Promise.reject(error));

//
axiosBaseURL.interceptors.response.use( 
    
    function (response) {
        return response;
    }, 

    async function (error) {

        console.log("Axios error: ",error);
    
        // if (error.response?.status === 401) { //UnAuthorized   
            
        //     localStorage.clear(); // Clear in redux-persist data
            
        //     window.location.href = 'login'; 
        // }  

        return Promise.reject(error);
    }

);