import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Counter from "../UI/Counter";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const initialNumOfItems = 8;
  const [numOfItems, setNumOfItems] = useState(initialNumOfItems);

  async function fetchnft() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(response.data);
  }

  async function sortItems(value) {
    setExploreItems([]);
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setExploreItems(response.data);
  }

  function loadMore() {
    setNumOfItems(numOfItems + 4);
  }

  useEffect(() => {
    fetchnft();
  }, []);

  return (
    <>
      <div>
          <select
            id="filter-items"
            defaultValue=""
            onChange={(event) => sortItems(event.target.value)}
          >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
          </select>
      </div>
      {exploreItems.length
        ? exploreItems.slice(0, numOfItems).map((exploreItems) => (
            <div
              key={exploreItems.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img
                      className="lazy"
                      src={exploreItems.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div>
                  {exploreItems.expiryDate !== null && (
                    <Counter item={exploreItems} />
                  )}
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={exploreItems.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{exploreItems.title}</h4>
                  </Link>
                  <div className="nft__item_price">
                    {exploreItems.price} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exploreItems.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton
                    width={"50px"}
                    height={"50px"}
                    borderRadius={"50%"}
                  />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <Skeleton
                    width={"300px"}
                    height={"225px"}
                    borderRadius={"8px"}
                  />
                </div>
                <div className="nft__item_info">
                  <Skeleton
                    width={"100px"}
                    height={"20px"}
                    borderRadius={"8px"}
                  />
                  <div className="nft__item_price">
                    <Skeleton
                      width={"60px"}
                      height={"20px"}
                      borderRadius={"8px"}
                    />
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      <Skeleton
                        width={"20px"}
                        height={"20px"}
                        borderRadius={"4px"}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {numOfItems < exploreItems.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => loadMore()}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
