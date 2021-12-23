import { useState } from "react";
import receiveFetch from "../../utils/receiveFetch"
import esnlogo from "../../assets/esnlogo.png";

const Login = () => {

	const [ list, setList ] = useState([])
	const [ loginfo, setLoginfo ] = useState({ username:"", password:"" })
	const [ errorinfo, setErrorinfo ] = useState("")

	async function sendLoginfo(e) {
		  e.preventDefault()
		  const res = await receiveFetch("/auth/login", "POST", loginfo)
		  if (res === loginfo.username) {
				localStorage.setItem("user", res)
				window.location.href = "/"
		  } else {
				setErrorinfo(res.message);
		  }
	}

	function handleInput(e) {
	  setLoginfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	function addToList(e) {
	  setList(prev => [...prev, e.target.name])
	}

	function removeFromList(e) {
	  if (!e.target.value) setList(prev => [...prev].filter(x => x != e.target.name))
	}

  	return (
    <main>
		<div className="baloon-right" />
	    <div className="baloon-left" />
        <img src={esnlogo} />
        <form onSubmit={sendLoginfo}>
          	<h1>Prijava</h1>
          	<div>
          	  	<input 
          	  	  	autoComplete="off"
          	  	  	type="text"
          	  	  	onChange={handleInput}
          	  	  	onFocus={addToList} 
          	  	  	onBlur={removeFromList}
          	  	  	name="username" 
          	  	  	id="username"
          	  	/>
          	  	<label className={list.includes("username") ? "label-active" : null} htmlFor="username">Username:</label>
          	</div>
          	<div>
          	  	<input 
          	  	  	type="password"
          	  	  	onFocus={addToList} 
          	  	  	onChange={handleInput}
          	  	  	onBlur={removeFromList}
          	  	  	name="password" 
          	  	  	id="password"
          	  	/>
          	  	<label className={list.includes("password") ? "label-active" : null} htmlFor="password">Password:</label>
          	</div>
          	<input className="submit" value="Prijava" type="submit" />
          	<p>{errorinfo ? `${errorinfo}*` : ""}</p>
        </form>
    </main>
  );
};

export default Login;
