import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Error = lazy(() => import("@/pages/Error"));
const LinearFrac = lazy(() => import("@/pages/LinearFrac"));
const FillFrac = lazy(() => import("@/pages/FillFrac"));

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSkeleton from "@/components/PageSekleton";

function App() {
	return (
		<Router>
			<Header />
			<main className="relative p-4">
				<Suspense fallback={<PageSkeleton />}>
					<Routes>
						<Route path="/geo-vis">
							<Route index Component={Home} />
							<Route path="linear/:fracID" Component={LinearFrac} />
							<Route path="fill/:fracID" Component={FillFrac} />
							<Route path="*" Component={Error} />
						</Route>
						<Route path="*" Component={Error} />
					</Routes>
				</Suspense>
			</main>
			<Footer
				appVersion={process.env.__APP_VERSION__!}
				repo={process.env.__GIT_REPO__!}
				user={process.env.__USER_PROFILE__!}
			/>
		</Router>
	);
}

export default App;
