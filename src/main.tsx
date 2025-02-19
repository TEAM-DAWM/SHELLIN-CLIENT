import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';

import App from '@/App.tsx';
import { ToastProvider } from '@/components/toast/ToastContext';
import GlobalStyle from '@/styles/GlobalStyle.tsx';
import { theme } from '@/styles/theme.ts';

import '@/styles/font.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 5,
			gcTime: 1000 * 60,
		},
	},
});
ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<GlobalStyle />
		<ThemeProvider theme={theme}>
			<ToastProvider>
				<App />
			</ToastProvider>
		</ThemeProvider>
		<div style={{ fontSize: '16px' }}>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" position="bottom" />
		</div>
	</QueryClientProvider>
);
