import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
	return (
		<div className="relative min-h-screen">
			<Header />
			<main className="my-4 px-8">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default SharedLayout;
