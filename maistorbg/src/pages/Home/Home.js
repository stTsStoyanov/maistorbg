import React from 'react'
import "./Home.scss"
import TopCraftsmen from '../../components/HomePage/TopCraftsmen'
import Review from '../../components/HomePage/Review'
import Articles from '../../components/HomePage/Articles'
import RegistrationPrompt from '../../components/HomePage/RegistrationPrompt'
import localStorageManager from '../../model/managers/localStorageManager'
import Advertisement from '../../components/HomePage/Advertisement'

export default function Home() {

  const user = localStorageManager.loggedUser();
  return (
    // <div>Home</div>
    <div className='home'>
      <TopCraftsmen />
      <Review />
      <Advertisement />
      <Articles />
      {user ? null : <RegistrationPrompt />}
    </div>

  )
}
