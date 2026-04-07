import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/shared/WhatsAppButton'
import EnquiryPopup from './components/shared/EnquiryPopup'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Academics from './pages/Academics'
import Admissions from './pages/Admissions'
import Facilities from './pages/Facilities'
import Gallery from './pages/Gallery'
import EventList from './pages/Events/EventList'
import EventDetail from './pages/Events/EventDetail'
import BlogList from './pages/Blog/BlogList'
import BlogDetail from './pages/Blog/BlogDetail'
import Contact from './pages/Contact'
import ParentPortal from './pages/ParentPortal'
import NotFound from './pages/NotFound'

// Admin
import AdminLayout from './admin/components/AdminLayout'
import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import EnquiryTable from './admin/pages/EnquiryTable'
import BlogEditor from './admin/pages/BlogEditor'
import EventEditor from './admin/pages/EventEditor'
import GalleryManager from './admin/pages/GalleryManager'
import TestimonialEditor from './admin/pages/TestimonialEditor'
import SeoSettings from './admin/pages/SeoSettings'
import SiteSettings from './admin/pages/SiteSettings'
import MediaLibrary from './admin/pages/MediaLibrary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
})

// Auth guard — wraps admin routes
function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('access_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

// Public layout wrapper (header + footer)
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <EnquiryPopup />
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ───── Admin Routes ───── */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="enquiries" element={<EnquiryTable />} />
              <Route path="blogs" element={<BlogEditor />} />
              <Route path="events" element={<EventEditor />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="testimonials" element={<TestimonialEditor />} />
              <Route path="seo" element={<SeoSettings />} />
              <Route path="settings" element={<SiteSettings />} />
              <Route path="media" element={<MediaLibrary />} />
            </Route>

            {/* ───── Public Routes ───── */}
            <Route
              path="/*"
              element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/academics" element={<Academics />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/events/:slug" element={<EventDetail />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/parent-portal" element={<ParentPortal />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
