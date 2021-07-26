// import logo from './logo.svg';
// import './App.css';



// import React from 'react';
// import Routes from './routes';
// import './App.scss';

// function App() {

  
//   return (
//     <div className="App">
//       <Routes />
//     </div>
//   );
// }

// export default App;

import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { PageLayout } from "./components/PageLayout";
// import { LaptopWindows } from "@material-ui/icons";
// import { ProfileData } from "./components/ProfileData";
// import { callMsGraph } from "./graph";

  function RequestOAuth2() {
      return axios({
        url: `https://login.microsoftonline.com/97e05be6-37b8-44e4-a9d5-4bd3fd6d05fe/oauth2/v2.0/authorize?client_id=24dd6098-7c88-416e-a6f0-e06f0288d777&response_type=code&scope=profile%20openid%20offline_access&redirect_uri=http://localhost:3000/`,
        method: 'get',
        timeout: 8000,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(function(data){
        debugger;
        return data.data;
      })
      .catch (err => {
        debugger;
        console.error(err)
      });

      // window.location.href= 'https://login.microsoftonline.com/97e05be6-37b8-44e4-a9d5-4bd3fd6d05fe/oauth2/v2.0/authorize?client_id=24dd6098-7c88-416e-a6f0-e06f0288d777&response_type=code&scope=profile%20openid%20offline_access&redirect_uri=http://localhost:3000/';
  }

function App() {
  return (
      <PageLayout>
          <p>This is the main app content!</p>

          <h1>with Axios</h1>
          <Button onClick={RequestOAuth2}>Request Profile Information</Button>
      </PageLayout>
  );
}

export default App;