import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import BrowsePage from './pages/BrowsePage';
import { LoginPage } from './pages/LoginPage';

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <LoginPage/> },
			{
				path: '/browse',
				element: <BrowsePage />,
			},
		],
	},
]);

createRoot(
	document.getElementById('root')!
).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={appRouter} />
		</Provider>
	</StrictMode>
);
