import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLogin } from '../../services/auth.service'

const PublicRoute = ({component:Component,...rest}) => {
    return (
        <Route {...rest} render={props=>(
            isLogin()? <Redirect to='/mypage'/>:
            <Component {...props} />
        )} />
    )
}

export default PublicRoute
