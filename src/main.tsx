import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { store } from './store.js';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import Browse from './components/Browse.jsx';
import { Login } from './components/Login.jsx';

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Login/> },
			{
				path: '/browse',
				element: <Browse />,
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
