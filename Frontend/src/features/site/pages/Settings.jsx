import React from 'react'
import '../style/site-pages.scss'

const PREFERENCES = [
  {
    title: 'Email Interview Tips',
    subtitle: 'Receive concise preparation tips before interviews',
    enabled: true,
  },
  {
    title: 'Weekly Progress Summary',
    subtitle: 'Get a weekly digest of your preparation status',
    enabled: true,
  },
  {
    title: 'Public Profile Visibility',
    subtitle: 'Keep your generated reports private by default',
    enabled: false,
  },
]

const Settings = () => {
  return (
    <section className='info-page'>
      <header className='info-page__hero'>
        <span className='info-page__eyebrow'>Settings</span>
        <h1>Preference overview for HIKARI_CV.</h1>
        <p>This page shows your current experience defaults. Interactive controls can be added later without impacting existing flow.</p>
      </header>

      <article className='info-card'>
        <h2>Notification & Privacy</h2>
        <div className='info-list'>
          {PREFERENCES.map((preference) => (
            <div key={preference.title} className='preference-row'>
              <div className='preference-copy'>
                <strong>{preference.title}</strong>
                <span>{preference.subtitle}</span>
              </div>
              <span className={`preference-pill ${preference.enabled ? 'preference-pill--on' : 'preference-pill--off'}`}>
                {preference.enabled ? 'On' : 'Off'}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default Settings
