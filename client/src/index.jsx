import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import App from './components/App';
// import store from './slices/index.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
	{/* <Provider store={store}> */}
	<AuthProvider >
       <Routes>
        <Route path='/*' element={<App />} />
        </Routes>
    </AuthProvider>
	{/* </Provider> */}
	</BrowserRouter>
);


