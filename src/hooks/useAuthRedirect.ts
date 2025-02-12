import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
	const navigate = useNavigate();
	const isAuthenticated = localStorage.getItem('accessToken');

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/today');
		}
	}, [isAuthenticated, navigate]);
};

export default useAuthRedirect;
