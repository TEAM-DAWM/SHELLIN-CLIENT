import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Calendar from '../pages/Calendar';
import DashBoard from '../pages/DashBoard';
import Login from '../pages/Login';
import MainLayout from '../pages/MainLayout';
import NotFound from '../pages/NotFound';
import Setting from '../pages/Setting';
import Today from '../pages/Today';

import PrivateRoute from './PrivateRoute';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route element={<PrivateRoute />}>
					<Route element={<MainLayout />}>
						<Route path="/today" element={<Today />} />
						<Route path="/dashboard" element={<DashBoard />} />
						<Route path="/calendar" element={<Calendar />} />
						<Route path="/setting" element={<Setting />} />
					</Route>
				</Route>
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
