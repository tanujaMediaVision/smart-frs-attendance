import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill,
  BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar, setActivePage, activePage }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'> 🛡️ SecureGate Pro
          {/* <BsCart3 className='icon_header' /> SHOP */}
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <p className='sidebar-list-p'>Main</p>
        <li className={`sidebar-list-item ${activePage === "dashboard" ? "active" : ""}`} onClick={() => setActivePage("dashboard")}>
          <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
        <li className={`sidebar-list-item ${activePage === "visitors" ? "active" : ""}`} onClick={() => setActivePage("visitors")}>
          <BsFillArchiveFill className='icon' /> Visitors
        </li>
        <li className={`sidebar-list-item ${activePage === "employees" ? "active" : ""}`} onClick={() => setActivePage("employees")}>
          <BsFillGrid3X3GapFill className='icon' /> Employees
        </li>
        <li className={`sidebar-list-item ${activePage === "vehicles" ? "active" : ""}`} onClick={() => setActivePage("vehicles")}>
          <BsPeopleFill className='icon' /> Vahicles
        </li>
        <p className='sidebar-list-p'>Security</p>
        <li className={`sidebar-list-item ${activePage === "liveGates" ? "active" : ""}`} onClick={() => setActivePage("liveGates")}>
          <BsMenuButtonWideFill className='icon' /> Live Gates
        </li>
        <li className={`sidebar-list-item ${activePage === "attendance" ? "active" : ""}`} onClick={() => setActivePage("attendance")}>
          <BsCart3 className='icon' /> Attendance
        </li>
        <p className='sidebar-list-p'>Reports</p>
        <li className={`sidebar-list-item ${activePage === "analytics" ? "active" : ""}`} onClick={() => setActivePage("analytics")}>
          <BsListCheck className='icon' /> Analytics
        </li>
        <li className={`sidebar-list-item ${activePage === "export" ? "active" : ""}`} onClick={() => setActivePage("export")}>
          <BsMenuButtonWideFill className='icon' /> Export
        </li>
        <p className='sidebar-list-p'>Settings</p>
        <li className={`sidebar-list-item ${activePage === "settings" ? "active" : ""}`} onClick={() => setActivePage("settings")}>
          <BsFillGearFill className='icon' /> Settings
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar