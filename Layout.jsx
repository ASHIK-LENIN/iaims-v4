import { useStore } from "../store/store"
import Header from "./Header"

const Layout = ({ children }) => {
  const { isAuthenticated } = useStore()

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  )
}

export default Layout
