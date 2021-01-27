import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLogin } from '../../services/auth.service'

const PrivateRoutes = ({component:Component, ...rest}) => {
    return (
        <Route {...rest} render={props=>(
            isLogin()?
            <Component {...props}/>:
            <Redirect to='/'/>
        )} />
    )
}

export default PrivateRoutes
