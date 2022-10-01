import axios from "axios";
import { LOGOUT_URL } from '../backend_urls.js';


const Logout = (props) => {

  const logMeOut = () => {
    axios({
      method: "POST",
      url: LOGOUT_URL,
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  	return(
		<header className="App-header">
			<button onClick={logMeOut}> 
        		logout
      </button>
		</header>
	)
}

export default logout;