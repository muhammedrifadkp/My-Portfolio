import WorkStage from '../sections/WorkStage'
import Statement from '../sections/Statement'
import Flight from '../sections/Flight'
import WorkIndex from '../sections/WorkIndex'
import Process from '../sections/Process'
import Services from '../sections/Services'
import StackMarquee from '../sections/StackMarquee'
import AboutTeaser from '../sections/AboutTeaser'
import Faq from '../sections/Faq'
import ContactBand from '../sections/ContactBand'

export default function Home() {
  return (
    <>
      <WorkStage />
      <Statement />
      <Flight />
      <WorkIndex />
      <Process />
      <Services />
      <StackMarquee />
      <AboutTeaser />
      <Faq />
      <ContactBand />
    </>
  )
}
