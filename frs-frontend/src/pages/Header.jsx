import { useState } from "react";
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs'
import { Dropdown } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
function Header({ OpenSidebar, onLogout }) {
    const [show, setShow] = useState(false);

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
            <div className='header-left'>
                {/* <BsSearch className='icon' />   */}
            </div>
            <div className='header-right'>
                <BsFillBellFill className='icon' />
                {/* <BsFillEnvelopeFill className='icon' /> */}
                {/* <BsPersonCircle className='icon' /> */}
                <Dropdown
                    show={show}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                    align="end"
                >
                    <Dropdown.Toggle
                        variant="link"
                        id="dropdown-user"
                        className="p-0 border-0"
                    >
                        <FaUserCircle size={25} className="text-dark" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={onLogout}>
                            <FaSignOutAlt className="me-2" />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header