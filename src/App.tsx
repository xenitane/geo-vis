import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Error from "@/pages/Error";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className="relative m-8">
				<Routes>
					<Route path="/geo-vis">
						<Route index Component={Home} />
						<Route path="linear-fractal/:fractalId" element={<div>Linear</div>} />
						<Route path="*" Component={Error} />
					</Route>
				</Routes>
			</main>
			<Footer
				appVresion={process.env.__APP_VERSION__ ?? "0.0.0"}
				repo={process.env.__GIT_REPO__ ?? "https://www.github.com/xenitane/geo-vis"}
				user={process.env.__USER_PROFILE__ ?? "https://www.github.com/xenitane"}
			/>
		</BrowserRouter>
	);
}

export default App;
