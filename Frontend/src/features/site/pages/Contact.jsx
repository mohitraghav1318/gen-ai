import React from 'react'
import '../style/site-pages.scss'

const CONTACT_CHANNELS = [
  {
    label: 'Email',
    value: 'support@hikari-cv.ai',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <path d='m4 7 8 6 8-6' />
      </svg>
    ),
  },
  {
    label: 'Schedule',
    value: 'Mon - Fri, 10:00 AM to 7:00 PM',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <circle cx='12' cy='12' r='9' />
        <path d='M12 7v5l3 2' />
      </svg>
    ),
  },
  {
    label: 'Response Time',
    value: 'Usually within one business day',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M21 12a9 9 0 1 1-3.18-6.88' />
        <path d='M22 3 12 13l-3-3' />
      </svg>
    ),
  },
]

const Contact = () => {
  return (
    <section className='info-page'>
      <header className='info-page__hero'>
        <span className='info-page__eyebrow'>Contact</span>
        <h1>Need help with your interview plan?</h1>
        <p>
          Reach out any time for support with uploads, report generation, or interview preparation workflow.
        </p>
      </header>

      <article className='info-card'>
        <h2>Support Channels</h2>
        <ul className='info-list'>
          {CONTACT_CHANNELS.map((channel) => (
            <li key={channel.label}>
              {channel.icon}
              <span>
                <strong>{channel.label}:</strong> {channel.value}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default Contact
