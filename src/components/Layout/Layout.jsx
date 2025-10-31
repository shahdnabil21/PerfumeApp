

import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

export default function Layout() {
  const location = useLocation()
  const hideFooter = location.pathname.startsWith('/cart')
  return (
    <div>
        <Nav/>
        <Outlet/>
        {!hideFooter && <Footer/>}
        
    </div>
  )
}