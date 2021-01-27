import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { isLogin } from "../../../services/auth.service";
import MapChart from "./MapChart";
import { Helmet } from 'react-helmet'

const Map = () => {
  const [content, setContent] = useState("");
  if(!isLogin()){
    return <Redirect to='/'/>
    }
  else{
    return (
      <div className='map-box'>
         <Helmet>
              <title>Geography Info | Interactive map</title>
          </Helmet>
        <div className='col-sm-8 alert alert-warning' style={{backgroundColor:' #063F6F'}}  id='map-world'>
          <h4 style={{color:'white'}}>World map with population (in milions)</h4>
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      </div>
    )
  }
}

export default Map

