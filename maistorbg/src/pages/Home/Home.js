import React from 'react'
import "./Home.scss"
import TopCraftsmen from '../../components/HomePage/TopCraftsmen'
import Review from '../../components/HomePage/Review'
import Articles from '../../components/HomePage/Articles'
import Advertisement from '../../components/HomePage/Advertisement'

export default function Home() {

  return (
    // <div>Home</div>
    <div className='home'>
      <TopCraftsmen />
      <Review />
      <Advertisement />
      <Articles />
    </div>

  )
}
