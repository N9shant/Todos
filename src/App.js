import { useState, useEffect } from 'react'
import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Todo from './Components/Todo'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { auth } from './firebase'


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      else {
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <BrowserRouter className="App">
      <NavBar user={user} />
      <Switch>
        <Route exact path="/">
          <Todo user={user} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
