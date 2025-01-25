import { isAxiosError } from 'axios';

import instance from '@/apis/instance';
import { LoginResponse } from '@/apis/login/loginInterface';
import MESSAGES from '@/apis/messages';

const AUTH_URL = {
	LOGIN: '/api/auth/login/google',
};

const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;
const userLogin = async (code: string): Promise<LoginResponse> => {
	try {
		const response = await instance.post<LoginResponse>(AUTH_URL.LOGIN, null, {
			params: { code, redirectUrl: REDIRECT_URL },
		});
		return response.data;
	} catch (error) {
		if (isAxiosError(error)) throw error;
		else throw new Error(MESSAGES.UNKNOWN_ERROR);
	}
};

export default userLogin;
