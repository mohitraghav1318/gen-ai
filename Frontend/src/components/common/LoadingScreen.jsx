import React from 'react'
import './loading-screen.scss'

const LoadingScreen = ({
  title = 'Preparing your interview workspace...',
  subtitle = 'Hang tight while we craft the best next step for you.',
  compact = false,
}) => {
  return (
    <main className={`loading-screen ${compact ? 'loading-screen--compact' : ''}`} role='status' aria-live='polite'>
      <section className='loading-screen__card'>
        <div className='loading-screen__orbital'>
          <span className='loading-screen__ring loading-screen__ring--outer' />
          <span className='loading-screen__ring loading-screen__ring--inner' />
          <span className='loading-screen__dot' />
        </div>

        <p className='loading-screen__brand'>HIKARI_CV</p>
        <h1>{title}</h1>
        <p className='loading-screen__subtitle'>{subtitle}</p>

        <div className='loading-screen__bar' aria-hidden='true'>
          <span />
        </div>
      </section>
    </main>
  )
}

export default LoadingScreen
