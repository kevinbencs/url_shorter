import Header from './components/Header'
import Main from './components/Main'
import { SidebarProvider } from './components/SidebarContext'
import { UrlProvider } from './components/UrlContext'

function App() {

  return (
    <SidebarProvider>
      <UrlProvider>
        <>
          <Header />
          <Main />
        </>
      </UrlProvider>
    </SidebarProvider>
  )
}

export default App
