import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

import ToastContainer from '@/components/toast/ToastContainer';
import { ToastType } from '@/types/toastType';

interface ToastItem {
	id: number;
	message: string;
	code: ToastType;
}

interface ToastContextProps {
	toasts: ToastItem[];
	addToast: (message: string, code: ToastType) => void;
	removeToast: (id: number) => void;
	revertToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const addToast = (message: string, code: ToastType) => {
		const id = new Date().getTime();
		setToasts((prevToasts) => [...prevToasts, { id, message, code }]);
	};

	const removeToast = (id: number) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	};

	const revertToast = (id: number) => {
		console.log('revertToast', id);
	};

	const value = useMemo(
		() => ({
			toasts,
			addToast,
			removeToast,
			revertToast,
		}),
		[toasts]
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	);
}
