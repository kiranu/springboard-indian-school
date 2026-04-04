import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import SeoHead from '../components/seo/SeoHead'
import AdmissionCta from '../components/shared/AdmissionCta'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Gallery() {
  const images = [
    { title: "Kid's Activity", category: "School", img: "1503454537195-1dc5343207c1", colClass: "vs-gallery--col1" },
    { title: "Learning", category: "School", img: "1588072432836-e10032774350", colClass: "vs-gallery--col2" },
    { title: "Playground", category: "Campus", img: "1472162005718-f6ee9fb3c2f0", colClass: "vs-gallery--col3" },
    { title: "Art Class", category: "School", img: "1505370603079-c88f9dbd6379", colClass: "vs-gallery--col4" }
  ]

  // Add more rows to the gallery to make it full
  const galleryRows = [
    images,
    [
      { title: "Kid's Playground", category: "Campus", img: "1516627145497-1962473bf1d0", colClass: "vs-gallery--col1" },
      { title: "Music Class", category: "School", img: "1514332219717-31df0a19e5de", colClass: "vs-gallery--col2" },
      { title: "Lunch Time", category: "School", img: "1597871146726-2678da401f78", colClass: "vs-gallery--col3" },
      { title: "Science Lab", category: "School", img: "1532098661621-e00b8c4c7f39", colClass: "vs-gallery--col4" }
    ],
    [
      { title: "Library", category: "School", img: "1550592704-6c76defa99ce", colClass: "vs-gallery--col1" },
      { title: "Sports Day", category: "Campus", img: "1526628953301-3e589a6a120a", colClass: "vs-gallery--col2" },
      { title: "Graduation", category: "Event", img: "1523580846011-d3a5ce2522eb", colClass: "vs-gallery--col3" },
      { title: "Garden", category: "Campus", img: "1517456793572-1d8efd6dc135", colClass: "vs-gallery--col4" }
    ]
  ]

  return (
    <>
      <SeoHead
        title="Gallery"
        description="View our gallery showcasing student activities, events, facilities, and campus life at Springboard Indian School."
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper z-index-common overflow-hidden">
        <div className="vs-balls vs-balls--screen" data-balls-bottom="-6px" data-balls-color="#ffffff"></div>
        <div className="breadcrumb-wrapper__bg">
          <img src="/assets/img/bg/breadcrumb-bg-3.jpg" alt="breadcrumb bg" />
        </div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="breadcrumb-wrapper__content">
            <h1 className="breadcrumb-wrapper__title">Our Gallery</h1>
            <div className="breadcrumb-wrapper__menu--wrap">
              <ul className="breadcrumb-wrapper__menu">
                <li className="breadcrumb-wrapper__menu--item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-wrapper__menu--item">Our Gallery</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Class / Gallery */}
      <section className="vs-class--area bg-color6 space space-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="vs-title text-center title-anime animation-style2">
                <div className="title-anime__wrap">
                  <span className="vs-title__sub">School Gallery</span>
                  <h2 className="vs-title__main">Our Gallery For Kids</h2>
                </div>
              </div>
            </div>
          </div>
          
          {galleryRows.map((row, rowIdx) => (
            <div key={rowIdx} className="vs-gallery--row" style={{ marginTop: rowIdx > 0 ? '30px' : '0' }}>
              {row.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } }
                  }}
                  className={`vs-gallery ${item.colClass}`}
                >
                  <div className="vs-gallery__figure">
                    <a className="vs-gallery__image--link" href="#">
                      <img className="vs-gallery__image" src={`https://images.unsplash.com/photo-${item.img}?q=80&w=600&h=600&fit=crop`} alt={item.title} loading="lazy" />
                    </a>
                  </div>
                  <div className="vs-gallery__hover">
                    <a href={`https://images.unsplash.com/photo-${item.img}?q=80&w=1200&h=800&fit=crop`} target="_blank" rel="noreferrer" className="vs-gallery__icon">
                      <FaEye />
                    </a>
                    <a href="#" className="vs-gallery__cate">{item.category}</a>
                    <a className="vs-gallery__heading--link" href="#">
                      <h4 className="vs-gallery__heading">{item.title}</h4>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <AdmissionCta subtitle="Love what you see? Schedule a campus visit to experience our school firsthand!" />
    </>
  )
}
