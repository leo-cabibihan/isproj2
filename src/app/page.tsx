import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { Content } from '@/components/Content'
import { Cards } from '@/components/Cards'
import { News } from '@/components/News'
import { ContentRight } from '@/components/ContentRight'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Content />
        <ContentRight />
        <Cards />
        <News />
      </main>
      <Footer />
    </>
  )
}
