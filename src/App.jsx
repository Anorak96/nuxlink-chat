import { HashRouter as Router, BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/ChatPage'
import Login from './pages/Login'
import { AuthProvider } from './pages/AuthContext'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/room/:room_name' element={<Chat />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</AuthProvider>
		</Router>
	)
}

export default App
