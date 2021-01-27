import React from 'react'
import { Redirect } from 'react-router-dom'
import profileDefault from '../../../images/profile-default.png'
import { isLogin } from '../../../services/auth.service'
import { Helmet } from 'react-helmet'

const Profile = () => {
    if(!isLogin()){
        return <Redirect to='/'/>
        }
    else{
        return (
            <div className="user-profile-box"> 
                <Helmet>
                    <title>Geography Info | Profile</title>
                </Helmet>
                <div className="profile">
                    <img src={profileDefault} alt="profile-dafault"/>
                    <table className='table table-hover table-striped' style={{borderStyle:'ridge'}}>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td></td>
                                <td>{localStorage.getItem('un')}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td></td>
                                <td>{localStorage.getItem('name')}</td>
                            </tr>
                            <tr>
                                <td>Surname</td>
                                <td></td>
                                <td>{localStorage.getItem('surname')}</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td></td>
                                <td>{localStorage.getItem('email')}</td>
                            </tr>
                            <tr>
                                <td>Last logged</td>
                                <td></td>
                                <td>{localStorage.getItem('date')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile
