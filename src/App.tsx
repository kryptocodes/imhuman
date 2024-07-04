import './App.css'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/layouts/AppLayout'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import RefferalDashboard from './pages/refferalDashboard/RefferalDashboard'
import ReferralCode from './pages/login/ReferralCode'
// import ComingSoon from './pages/ComingSoon'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />}  >
        {/* <Route path='/' element={<ComingSoon />} /> */}
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/referral-dashboard' element={<RefferalDashboard />} />
        <Route path='/referral-code' element={<ReferralCode />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App 
