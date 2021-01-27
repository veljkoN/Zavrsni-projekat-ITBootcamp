import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AllCountriesGlobalProvider from './context/AllCountryContext'
import Home from './layout/private/components/Home'
import FirstPage from './layout/public/components/FirstPage'
import Footer from './layout/public/components/Footer'
import NavBar from './layout/public/components/NavBar'
import TopFlags from './layout/public/components/TopFlags'
import Countries from './layout/private/components/Countries'
import Country from './layout/private/components/Country'
import CompareCountries from './layout/private/components/CompareCountries'
import CompareCountryItem from './layout/private/components/CompareCountryItem'
import RegionalBlocs from './layout/private/components/RegionalBlocks'
import Map from './layout/private/components/Map'
import Flags from './layout/private/components/Flags'
import Profile from './layout/private/components/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <AllCountriesGlobalProvider>
        <TopFlags />
      </AllCountriesGlobalProvider>
      <NavBar /> 
      <Switch>
        <AllCountriesGlobalProvider>
          <Route component={Countries} path='/countries' exact/>
          <Route component={Country} path='/country/:name?' exact />
          <Route component={CompareCountries} path='/compare-countries' exact/>
          <Route component={CompareCountryItem} path='/compareCountryItem' exact/>
          <Route component={RegionalBlocs} path='/regional-blocks' exact/>
          <Route component={Flags} path='/flags' exact/>
          <Route component={Map} path='/map'/>
          <Route component={Profile} path='/profile' exact />
          <Route component={Home} path='/home' exact />
          <Route component={FirstPage} path='/' exact/>
        </AllCountriesGlobalProvider>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App

