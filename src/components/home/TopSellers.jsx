import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  async function fetchTopSellers() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(response.data);
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.length
                ? topSellers.map((topSellers) => (
                    <li key={topSellers.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topSellers.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topSellers.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSellers.authorId}`}>
                          {topSellers.authorName}
                        </Link>
                        <span>{topSellers.price}</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width={"50px"}
                          height={"50px"}
                          borderRadius={"50%"}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                          <Skeleton
                            width={"100px"}
                            height={"20px"}
                            borderRadius={"4px"}
                          />
                        </Link>
                        <span>
                          <Skeleton
                            width={"50px"}
                            height={"20px"}
                            borderRadius={"4px"}
                          />
                        </span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
