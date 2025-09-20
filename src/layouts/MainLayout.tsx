import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
	children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className='min-h-screen bg-black'>
			<Navbar />
			<main>{children}</main>
		</div>
	);
};