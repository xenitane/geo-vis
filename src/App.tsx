import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Error = lazy(() => import("@/pages/Error"));
const Linear = lazy(() => import("@/pages/Linear"));

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
							<Route path="linear/:fracID" element={<Linear type="linear" />} />
							<Route path="fill/:fracID" element={<Linear type="fill" />} />
							<Route path="*" Component={Error} />
						</Route>
					</Routes>
				</Suspense>
			</main>
			<Footer
				appVresion={process.env.__APP_VERSION__ ?? "0.0.0"}
				repo={process.env.__GIT_REPO__ ?? "https://www.github.com/xenitane/geo-vis"}
				user={process.env.__USER_PROFILE__ ?? "https://www.github.com/xenitane"}
			/>
		</Router>
	);
}

export default App;
