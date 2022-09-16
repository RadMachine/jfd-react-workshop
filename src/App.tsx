import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import CoursePage from './pages/CoursePage'
import CoursesPage from './pages/CoursesPage'
import LoginPage from './pages/LoginPage'
import { AuthStore } from './stores/Auth'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    if (pathname === '/login' && AuthStore.isAuth) navigate('/courses', { replace: true })
    if (pathname !== '/login' && !AuthStore.isAuth) navigate('/login', { replace: true })
    if (pathname === '/') navigate('/courses', { replace: true })
    reaction(
      () => AuthStore.isAuth,
      val => !val && navigate('/login')
    )
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="courses" element={<Layout />}>
        <Route index element={<CoursesPage />} />
        <Route path=":courseId" element={<CoursePage />} />
      </Route>
    </Routes>
  )
})

export default App
