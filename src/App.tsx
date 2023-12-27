import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/components/Home";
import Error from "@/components/Error";
import SharedLayout from "@/pages/SharedLayout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path="linear/:fractalId" element={<div>Linear</div>} />
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
