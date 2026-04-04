import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SeoHead from '../components/seo/SeoHead'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Page Not Found</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">404 Page</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="error-area space z-index-common text-center">
        <div className="container">
          <div className="error-area__content">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInUp} 
              className="error-area__header mb-30 d-flex align-items-center justify-content-center"
            >
              <h2 className="error-area__title m-0 d-flex align-items-center gap-3">
                <span style={{ width: '40px', height: '2px', backgroundColor: 'currentColor', display: 'inline-block' }}></span>
                error page
                <span style={{ width: '40px', height: '2px', backgroundColor: 'currentColor', display: 'inline-block' }}></span>
              </h2>
            </motion.div>
            
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-30" 
              src="/assets/img/404/error-image-1.png" 
              alt="404 error" 
            />
            
            <motion.h2 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
              }}
              className="error-area__number mb-30 text-capitalize"
            >
              oops<span className="text-theme-color2">!</span> that page can't be found
            </motion.h2>

            <motion.div
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
              }}
            >
              <Link to="/" className="vs-btn">
                <span className="vs-btn__border"></span>go back homepage
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
