import React, { useEffect, useState } from "react";
import "./About.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loader";

function About() {
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
      <Link to="/dashboard/addabout">
        <button className="add_about_btn">Add New About</button>
      </Link>
      {about &&
        about.map((item, index) => {
          return (
            <div key={index} className="about_page">
              <h1>About Images</h1>
              <div className="card">
                {item.image.map((singleImage) => {
                  return (
                    <img src={singleImage} alt="mom" className="about_images" />
                  );
                })}
              </div>
              <h2>About Paragraphs</h2>
              <div className="about_paragraphs">
                <h3>Arabic Paragraph</h3>
                <p>{item.arabic_paragraph}</p>
                <h3>English Paragraph</h3>
                <p>{item.english_paragraph}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default About;
