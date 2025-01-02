import Header from "./components/Header"
import Homepage from "./components/Homepage"

function App() {

  return (
      <div className="flex flex-col max-w-[1000px] mx-auto w-full">
        <section className="min-h-screen flex flex-col">
          <Header />
          <Homepage />
        </section>
      </div>
  )
}

export default App
