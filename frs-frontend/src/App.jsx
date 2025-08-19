// import { useState } from 'react'
// import './App.css'
// import Header from '../src/pages/Header'
// import Sidebar from '../src/pages/Sidebar'
// import Home from '../src/pages/Home'

// function App() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   return (
//     <div className='grid-container'>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
//       <Home />
//     </div>
//   )
// }

// export default App

        

import { useState } from 'react'
import './App.css'
import Header from '../src/pages/Header'
import Sidebar from '../src/pages/Sidebar'
import Home from '../src/pages/Home'
// import Products from '../src/pages/Products'
// import Categories from '../src/pages/Categories'
// import Customers from '../src/pages/Customers'
// import Reports from '../src/pages/Reports'
// import Settings from '../src/pages/Settings'  

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activePage, setActivePage] = useState("dashboard") 

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Home />
      // case "products": return <Products />
      // case "categories": return <Categories />
      // case "customers": return <Customers />
      // case "reports": return <Reports />
      // case "settings": return <Settings />
      default: return <Home />
    }
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar 
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
        setActivePage={setActivePage} 
      />
      {renderPage()}
    </div>
  )
}

export default App
