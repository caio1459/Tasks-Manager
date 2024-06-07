import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Users } from '../pages/users'


export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}