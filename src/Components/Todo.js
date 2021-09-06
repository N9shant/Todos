import React, { useState, useEffect } from 'react'
import '../Styles/Todo.css'

import { db } from '../firebase'
import { useHistory } from 'react-router-dom';

let unsubscribe = () => { }

export default function Todo({ user }) {
    const [text, setText] = useState('');
    const [myTodo, setMyTodo] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (user) {
            const docRef = db.collection('todos').doc(user.uid)
            unsubscribe = docRef.onSnapshot(docSnap => {
                if (docSnap.exists) {
                    console.log(docSnap.data().todos);
                    setMyTodo(docSnap.data().todos);
                }
                else {
                    console.log('no docs');
                }
            })
        }
        else {
            history.push('/login')
        }

        return () => {
            unsubscribe() // cleanup code
        }
    }, [history, user]);

    const addTodo = () => {
        if (text) {
            db.collection('todos').doc(user.uid).set({
                todos: [...myTodo, text]
            })
        }
        else {
            window.M.toast({ html: `Can't add an empty Todo`, classes: "red" });
        }

    }

    const deleteTodo = (index) => {
        const docRef = db.collection('todos').doc(user.uid);
        docRef.get().then(docSnap => {
            const result = docSnap.data().todos; // array of todos
            result.splice(index, 1)
            docRef.update({
                todos: result
            })
        })
    }

    return (
        <div className="Todo container center">
            <h2>Add Todos</h2>
            <div className="input-field">
                <input type="text" value={text} placeholder="Eg. Internship work" onChange={(e) => setText(e.target.value)} />
            </div>
            <button className="btn blue" onClick={() => {
                addTodo()
                setText('')
            }}>Add</button>

            <ul class="collection">
                {myTodo.map((todo, index) => {
                    return <li className="collection-item" key={new Date().getTime().toString}>
                        {todo}
                        <i className="material-icons right" onClick={() => deleteTodo(index)}>delete</i>
                    </li>
                })}

            </ul>
        </div>
    )
}
