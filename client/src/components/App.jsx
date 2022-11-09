import '../css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Auth/Layout';
import NotFound from './Errors/NotFound';
import RequreAuth from './Auth/RequireAuth';
import ServerError from './Errors/ServerError';
import WelcomePage from './Auth/WelcomePage';


function App() {
  return (
		<Routes>
			<Route path="/" element={<Layout />} >
				{/* Auth module */}
				<Route path='/' element={<WelcomePage />} />
				{/* only authorized users */}
				<Route element={<RequreAuth allowedRoles={['User', 'Admin']}/>} >
					</Route>
				<Route element={<RequreAuth allowedRoles={['Admin']}/>} >
				</Route>
				<Route path="*" element={<NotFound />} />
				<Route path='500' element={<ServerError />} />
			</Route>
		</Routes>
	);
}

export default App;
