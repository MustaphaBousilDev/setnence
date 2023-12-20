import NavBar from '../components/Navbar'
import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
      <NavBar/>
      <div className=' mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6'>
        <div className=' flex items-center gap-4'>
          <div className=' w-full mt-4'>
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard