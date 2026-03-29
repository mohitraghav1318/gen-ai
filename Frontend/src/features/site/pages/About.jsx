import React from 'react'
import '../style/site-pages.scss'

const ABOUT_PILLARS = [
  {
    title: 'Precision First',
    description:
      'Every interview plan is generated from your job context and profile details to keep recommendations practical and role-specific.',
  },
  {
    title: 'Actionable Feedback',
    description:
      'Instead of generic tips, the platform breaks down technical, behavioral, and preparation priorities so you know where to focus.',
  },
  {
    title: 'Fast Iteration',
    description:
      'You can regenerate and compare plans quickly, making it easier to refine your preparation as roles and priorities evolve.',
  },
]

const About = () => {
  return (
    <section className='info-page'>
      <header className='info-page__hero'>
        <span className='info-page__eyebrow'>About</span>
        <h1>Built to make interview prep structured and less stressful.</h1>
        <p>
          HIKARI_CV turns role requirements and candidate context into clear interview strategy, so preparation feels
          focused rather than overwhelming.
        </p>
      </header>

      <div className='info-grid'>
        {ABOUT_PILLARS.map((pillar) => (
          <article key={pillar.title} className='info-card'>
            <h2>{pillar.title}</h2>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default About
