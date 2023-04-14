import React from 'react'
import "./Home.scss"
import TopCraftsmen from '../../components/HomePage/TopCraftsmen'
import Review from '../../components/HomePage/Review'
import Articles from '../../components/HomePage/Articles'
import RegistrationPrompt from '../../components/HomePage/RegistrationPrompt'

export default function Home() {
  return (
    // <div>Home</div>
    <>
      <TopCraftsmen/>
      <Review/>
      <Articles/>
      <RegistrationPrompt/>
    </>

  )
}
