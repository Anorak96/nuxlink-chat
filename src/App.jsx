import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Index from './pages/Index'
import ChatPage from './pages/ChatPage'

import { AuthProvider } from './pages/AuthContext'

function App() {
  
    return (
		<AuthProvider>
			<HashRouter>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route index element={<Index />} />
						<Route path='/room/:uuid' element={<ChatPage />} />
						<Route path='/login' element={<Login />} />
					</Route>
				</Routes>
			</HashRouter>
		</AuthProvider>
    )
}

export default App
