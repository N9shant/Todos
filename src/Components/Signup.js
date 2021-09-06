import React, { useState } from 'react'
import '../Styles/Signup.css'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);

        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            window.M.toast({ html: `welcone: ${result.user.email}`, classes: "green" });
            history.push("/");
        }
        catch (err) {
            window.M.toast({ html: err.message, classes: "red" });
            console.log(err.message);
        }
    }
    return (
        <div className="Signup center container">
            <h3>Signup page</h3>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="input-field">
                    <input type="email" value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn blue">Sign up</button>
                    {/* <label for="first_name">First Name</label> */}
                </div>
            </form>
        </div>
    )
}
