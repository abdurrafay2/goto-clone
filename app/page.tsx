import SearchForm from '../src/components/searchForm'
import Hero from '../src/components/hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <SearchForm />
      </div>
    </main>
  )
}