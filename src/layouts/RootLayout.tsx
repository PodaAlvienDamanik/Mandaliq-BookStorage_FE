import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto px-4">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default RootLayout