import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'


export default function NavBar({ user }) {
    const history = useHistory();

    return (
        <nav className="NavBar">
            <div className="nav-wrapper red">
                <Link to="#" className="brand-logo">TODOS</Link>
                <ul id="nav-mobile" className="right">

                    {
                        user ? <li><button className="btn grey" onClick={() => {
                            auth.signOut();
                            history.push("/login");
                        }}> logout</button></li> :
                            <>
                                <li><Link className="size" to="/login">Login</Link></li>
                                <li><Link className="size" to="/signup">Signup</Link></li>
                            </>
                    }
                </ul>
            </div>
        </nav>
    )
}
