import Header from "@/components/Header";
import { Suspense } from "react";
import PageSkeleton from "@/components/PageSekleton";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { cn } from "./lib/utils";

function App() {
	return (
		<div className="flex min-h-screen flex-col">
			<ScrollToTop />
			<Header />
			<main className={cn("flex-[1_0_auto] bg-white p-4 text-neutral-950", "dark:bg-neutral-900 dark:text-neutral-50")}>
				<Suspense fallback={<PageSkeleton />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer
				appVersion={process.env.__APP_VERSION__!}
				repo={process.env.__GIT_REPO__!}
				user={process.env.__USER_PROFILE__!}
			/>
		</div>
	);
}

export default App;
