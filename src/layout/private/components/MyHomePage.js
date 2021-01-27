import React from 'react'
import '../../../style/Home/MyHomePage.scss'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const MyHomePage = () => {
    return (
        
        <div className="my-home-page">
            <Helmet>
                <title>Geography Info | Home</title>
            </Helmet>
            <div className="card">
                <div className="card__content">
                    <h2 className="card__header">Search through our sections </h2>
                    <ul className="card__list">
                        <li className="card__item">
                            <Link to="/countries">
                                Countries all over the world
                            </Link>
                        </li>
                        <li className="card__item">
                            <Link to="/compare-countries">
                                Compare two countries
                            </Link>
                        </li>
                        <li className="card__item">
                            <Link to="/regional-blocks">
                                Regional block and associations
                            </Link>
                        </li>
                        <li className="card__item">
                            <Link to="/flags">
                                Images of flags
                            </Link>
                        </li>
                        <li className="card__item">
                            <Link to="/map">
                                Interactive map
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyHomePage
