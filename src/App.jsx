import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Index from './pages/Index'
import ChatPage from './pages/ChatPage'

import { AuthProvider } from './pages/AuthContext'

function App() {
  
    return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route index element={<Index />} />
						<Route path='/room/:uuid' element={<ChatPage />} />
						<Route path='/login' element={<Login />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
    )
}

export default App
