import React, { useEffect, useState } from "react";
import "./DollsHouse.css";
import Hoda from "../images/hoda1.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DollsHouse() {
  const [lastvideo, setLastVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getlastvideo();
  }, []);

  const { name } = useParams();

  const getlastvideo = async () => {
    let res = await axios.get(`http://localhost:2000/api/video/last/${name}`);
    try {
      setLastVideo(res.data.response);
      setLoading(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="DollHouse_page">
          <div className="Doll_House">
            <h1>How to build the Dollhouse</h1>
            <div className="DollHouse_image">
              {lastvideo.map((e, index) => {
                return (
                  <div key={index}>
                    <iframe
                      width="860"
                      height="415"
                      src={e.path}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
          <section className="dollHouse">
            <h2>Dollhouse Look</h2>
            <div className="dollsHouse_AllImages">
              <div>
                <img src={Hoda} alt="" />
              </div>
              <div>
                <img src={Hoda} alt="" />
              </div>
              <div>
                <img src={Hoda} alt="" />
              </div>
              <div>
                <img src={Hoda} alt="" />
              </div>
              <div>
                <img src={Hoda} alt="" />
              </div>
              <div>
                <img src={Hoda} alt="" />
              </div>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </>
  );
}
