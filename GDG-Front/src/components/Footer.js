import React from 'react'
import { Link } from 'react-router-dom';
import Dolls from "../images/hopes-dolls-store.png"
import "../components/Footer.css";
import {FaInstagram} from "react-icons/fa";
import {FaFacebookF} from "react-icons/fa";
import {HiOutlineMail} from "react-icons/hi"
import {SiWhatsapp} from "react-icons/si";
function Footer() {
  return (
    <>
      <section className="newsletter-section">
        <h3>Our Newsletter</h3>
        <p>Do you want to stay in touch with out activities?</p>
        <div className="newsletter-form-section">
          <h4>Join Our Newsletter</h4>
          <form className="newsletter-form">
            <label>
              <span>Email Address*</span>
              <input className="newsletter-email" placeholder='Please Enter Your Email' type="email" required />
            </label>
            <button className="newsletter-btn">Submit</button>
          </form>
        </div>
      </section>


      <footer>
        <div className='footer'>

          <img src={Dolls} alt="Doll_Logo" />

          <div className='footer_content'>

            <div className='left_content'>
              <h2>Quick Links</h2>
              <div className='footer_subContent'>
                <Link className='footer_links grow left' to="/">Home</Link>
                <Link className='footer_links grow' to="/">Dolls</Link>
                <Link className='footer_links grow left' to="/">Psychological Facts</Link>
                <Link className='footer_links grow' to="/">Story</Link>
                <Link className='footer_links grow left' to="/">Hoops</Link>
                <Link className='footer_links grow' to="/">Podcast</Link>
              </div>
            </div>

            <div className='right_content'>
              <h2>Follow Us</h2>
              <div className='footer_subContent'>
                <div className='insta_link'>
                <FaInstagram className='insta'/>
                <Link  to="/"className='footer_socials grow'>hopes.dolls.store</Link>
                </div>
                <div className='mail_link'>
                <HiOutlineMail className='mail'/>
                <Link to="/"className='footer_socials grow'>hopesdollsstore@gmail.com</Link>
                </div>
                <div className='facebook_link'>
                <FaFacebookF className='facebook'/>
                <Link to="/"className='footer_socials grow'>Hopes Dolls Store</Link>
                </div>
                <div className='whatsapp_link'>
                <SiWhatsapp className='whatsapp'/>
                <Link to="/"className='footer_socials grow'>0096106693437</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <p>Made with &hearts;</p>
          <p>@Copyright Hopes 2021-designed by Loubna</p>
        </div>
      </footer>
    </>
  )
}

export default Footer;