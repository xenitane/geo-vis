import Header from "@/components/Header";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSekleton";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
	return (
		<>
			<ScrollToTop />
			<Header />
			<main className="relative p-4">
				<Suspense fallback={<PageSkeleton />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer
				appVersion={process.env.__APP_VERSION__!}
				repo={process.env.__GIT_REPO__!}
				user={process.env.__USER_PROFILE__!}
			/>
		</>
	);
}

export default App;
