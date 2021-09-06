import React, { useState } from 'react'
import '../Styles/Login.css'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);

        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            window.M.toast({ html: `welcone: ${result.user.email}`, classes: "green" });
            history.push("/");
        }
        catch (err) {
            window.M.toast({ html: err.message, classes: "red" });
            console.log(err.message);
        }
    }
    return (
        <div className="Login center container">
            <h3>Login page</h3>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="input-field">
                    <input type="email" value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn blue">Login</button>
                </div>
            </form>
        </div>
    )
}
