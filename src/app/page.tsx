import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Hero, Cards, Content, ContentRight, News } from '@/components/Single-use'
import { DefaultLayout } from '@/components/layouts/Default'

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <main>
        <Hero />
        <Content />
        <ContentRight />
        <Cards />
        <News />
      </main>
      </DefaultLayout>
    </>
  )
}
