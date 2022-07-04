import React, { useEffect, useState } from "react";
import "./Story.css";
import axios from "axios";
import Loading from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Story() {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/abouts`)
      .then((res) => {
        console.log(res.data);
        setAbout(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      {about &&
        about.map((item, index) => {
          return (
            <div key={index} className="about-section">
              <div className="about-content">
                <div className="parag-content">
                  <div className="story-title">
                    <div className="titles">
                      <h2>Hello, I'm Hoda Metlej</h2>
                      <h3>مرحباً، انا هدى متلج</h3>
                    </div>
                  </div>
                  <div className="parag-data">
                    <p id="Arabic-text">{item.arabic_paragraph}</p>
                    <p>{item.english_paragraph}</p>
                  </div>
                </div>
                <div className="img-content">
                  {item.image.map((images) => {
                    return <img className="img1" src={images} alt="mee-pic" />;
                  })}
                </div>
              </div>
            </div>
          );
        })}
          <Footer/>
    </>

  );
}
