import {useNavigate as useRouterNavigate} from 'react-router-dom';

export const useAppNavigate = () => {
    const navigate = useRouterNavigate();
    return navigate;
};