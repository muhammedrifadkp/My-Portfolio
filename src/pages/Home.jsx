import { useEffect } from 'react'
import WorkStage from '../sections/WorkStage'
import Flight from '../sections/Flight'
import WorkIndex from '../sections/WorkIndex'
import Services from '../sections/Services'
import AboutTeaser from '../sections/AboutTeaser'
import ContactBand from '../sections/ContactBand'

export default function Home() {
  useEffect(() => { document.title = 'Muhammed Rifad KP | Full-stack developer in Kerala' }, [])
  return (
    <>
      <WorkStage />
      <Flight />
      <WorkIndex />
      <Services />
      <AboutTeaser />
      <ContactBand />
    </>
  )
}
