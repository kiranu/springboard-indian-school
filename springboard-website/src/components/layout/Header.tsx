import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneVolume, FaClock, FaXmark, FaBars, FaFacebookF, FaInstagram, FaYoutube, FaXTwitter, FaBullhorn } from 'react-icons/fa6'
import { useSettings } from '../../hooks/useSettings'

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { settings } = useSettings()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      {settings.announcement_enabled && settings.announcement_bar && (
        <div style={{
          background: 'linear-gradient(90deg, #70167E, #b197fc)',
          color: '#fff',
          textAlign: 'center',
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          zIndex: 9998,
          position: 'relative',
        }}>
          <FaBullhorn style={{ flexShrink: 0 }} />
          <span>{settings.announcement_bar}</span>
          <Link to="/admissions" style={{ color: '#FFD43B', marginLeft: 8, textDecoration: 'underline', fontWeight: 700 }}>
            Apply Now →
          </Link>
        </div>
      )}

      {/* Mobile Menu (Matches the template's vs-menu-wrapper structure) */}
      <div className={`vs-menu-wrapper ${mobileMenuOpen ? 'vs-body-visible' : ''}`}>
        <div className="vs-menu-area text-center">
          <div className="mobile-logo">
            <Link to="/"><img src="/assets/img/springboard-logo.png" alt="Springboard" className="logo" /></Link>
            <button className="vs-menu-toggle" onClick={() => setMobileMenuOpen(false)}>
              <FaXmark />
            </button>
          </div>
          <div className="vs-mobile-menu">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li className="menu-item-has-children">
                <Link to="/academics">ACADEMICS</Link>
                <ul className="sub-menu">
                  <li><Link to="/academics#play-group">Play Group</Link></li>
                  <li><Link to="/academics#nursery">Nursery</Link></li>
                  <li><Link to="/academics#kg">KG</Link></li>
                  <li><Link to="/academics#grade-1">Grade 1-4</Link></li>
                  <li><Link to="/academics#grade-5">Grade 5-7</Link></li>
                </ul>
              </li>
              <li><Link to="/admissions">ADMISSIONS</Link></li>
              <li><Link to="/facilities">FACILITIES</Link></li>
              <li><Link to="/gallery">GALLERY</Link></li>
              <li><Link to="/events">EVENTS</Link></li>
              <li><Link to="/blog">BLOG</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="vs-header">
        <div className="vs-balls"></div>
        
        {/* Header Top */}
        <div className="vs-header__top">
          <div className="container container--custom">
            <div className="row align-items-center justify-content-between gy-1 text-center text-lg-start">
              <div className="col-lg-auto d-none d-lg-block">
                <div className="d-flex align-items-center flex-wrap gap-4">
                  <div className="vs-header__info">
                    <FaPhoneVolume />
                    <span> Phone : <a href={`tel:${settings.phone_primary}`}>{settings.phone_primary || '+91-40-XXXXXXXX'}</a></span>
                  </div>
                  <div className="vs-header__info">
                    <FaClock />
                    <span className="text-theme-color5">
                      Opening Time :
                      <a href="#">9:30am-5:30pm</a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-auto">
                <div className="social-style">
                  <span className="social-style__label">follow us :</span>
                  {settings.facebook_url  && <a href={settings.facebook_url}  target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>}
                  {settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
                  {settings.youtube_url   && <a href={settings.youtube_url}   target="_blank" rel="noopener noreferrer"><FaYoutube /></a>}
                  {settings.twitter_url   && <a href={settings.twitter_url}   target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Header Wrapper */}
        <div className={`sticky-wrapper ${isSticky ? 'sticky' : ''}`}>
          <div className="sticky-active">
            <div className="container container--custom">
              <div className="row justify-content-between align-items-center">
                {/* Logo */}
                <div className="col">
                  <div className="vs-header__logo">
                    <Link to="/">
                      <img src="/assets/img/springboard-logo.png" alt="Springboard" className="logo" style={{ maxHeight: '70px' }} />
                    </Link>
                  </div>
                </div>
                
                {/* Desktop Menu */}
                <div className="col-auto">
                  <nav className="main-menu d-none d-lg-block">
                    <ul>
                      <li>
                        <Link to="/" className="vs-svg-assets">
                          HOME
                          <svg xmlns="http://www.w3.org/2000/svg" width="87" height="31" viewBox="0 0 87 31" fill="none">
                            <path d="M0 4.14031C0 1.87713 1.87602 0.0646902 4.13785 0.142684L83.1379 2.86682C85.2921 2.94111 87 4.70896 87 6.86445V25.0909C87 27.2642 85.2647 29.0399 83.0919 29.0898L4.09193 30.9059C1.84739 30.9575 0 29.1521 0 26.907V4.14031Z" fill="#70167E"></path>
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" className="vs-svg-assets">
                          ABOUT
                          <svg xmlns="http://www.w3.org/2000/svg" width="87" height="31" viewBox="0 0 87 31" fill="none">
                            <path d="M0 4.14031C0 1.87713 1.87602 0.0646902 4.13785 0.142684L83.1379 2.86682C85.2921 2.94111 87 4.70896 87 6.86445V25.0909C87 27.2642 85.2647 29.0399 83.0919 29.0898L4.09193 30.9059C1.84739 30.9575 0 29.1521 0 26.907V4.14031Z" fill="#70167E"></path>
                          </svg>
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link to="/academics" className="vs-svg-assets">
                          ACADEMICS
                          <svg xmlns="http://www.w3.org/2000/svg" width="132" height="31" viewBox="0 0 132 31" fill="none">
                            <path d="M0 4.14031C0 1.87713 1.87602 0.0646902 4.13785 0.142684L128.138 2.86682C130.292 2.94111 132 4.70896 132 6.86445V25.0909C132 27.2642 130.265 29.0399 128.092 29.0898L4.09193 30.9059C1.84739 30.9575 0 29.1521 0 26.907V4.14031Z" fill="#70167E"></path>
                          </svg>
                        </Link>
                        <ul className="sub-menu">
                          <li><Link to="/academics#play-group">Play Group</Link></li>
                          <li><Link to="/academics#nursery">Nursery</Link></li>
                          <li><Link to="/academics#kg">KG</Link></li>
                          <li><Link to="/academics#grade-1">Grade 1-4</Link></li>
                          <li><Link to="/academics#grade-5">Grade 5-7</Link></li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/facilities" className="vs-svg-assets">
                          FACILITIES
                          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="31" viewBox="0 0 128 31" fill="none">
                            <path d="M0 4.14031C0 1.87713 1.87602 0.0646902 4.13785 0.142684L124.138 2.86682C126.292 2.94111 128 4.70896 128 6.86445V25.0909C128 27.2642 126.265 29.0399 124.092 29.0898L4.09193 30.9059C1.84739 30.9575 0 29.1521 0 26.907V4.14031Z" fill="#70167E"></path>
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="vs-svg-assets">
                          CONTACT
                          <svg xmlns="http://www.w3.org/2000/svg" width="107" height="31" viewBox="0 0 107 31" fill="none">
                            <path d="M0 4.14031C0 1.87713 1.87602 0.0646902 4.13785 0.142684L103.138 2.86682C105.292 2.94111 107 4.70896 107 6.86445V25.0909C107 27.2642 105.265 29.0399 103.092 29.0898L4.09193 30.9059C1.84739 30.9575 0 29.1521 0 26.907V4.14031Z" fill="#70167E"></path>
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                
                {/* Actions */}
                <div className="col-auto">
                  <div className="vs-header__action">
                    <div className="d-none d-xxl-inline-flex">
                      <Link to="/admissions" className="vs-btn">
                        <span className="vs-btn__border"></span>admission
                      </Link>
                    </div>
                    {/* Mobile toggle button */}
                    <button 
                      className="vs-menu-toggle style2 d-inline-block d-lg-none"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <FaBars />
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
