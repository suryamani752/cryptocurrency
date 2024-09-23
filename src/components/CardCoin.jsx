import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Pagination from "./Pagination";

const CardCoin = () => {
  const { filteredCoin, search, error } = useContext(CryptoContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(filteredCoin.length / itemsPerPage);

  const displayedItems = filteredCoin.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!filteredCoin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  // console.log(filteredCoin);
  return (
    <>
      <Layout>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 p-4 gap-5">
          {displayedItems.map((coin) => (
            <Link to={`/coin/${coin.id}`} key={coin.id}>
              <div className="flex flex-col justify-center items-center gap-5 p-4 border-4 rounded-[10px]">
                <div className="w-[120px]">
                  <img src={coin.image} alt="" />
                </div>
                <div>
                  <p>Name: {coin.name}</p>
                  <p>Market-cap: Rs.{coin.market_cap.toLocaleString()}</p>
                  <p>Current-Price: Rs.{coin.current_price.toLocaleString()}</p>
                  {coin.price_change_percentage_24h < 0 ? (
                    <p>
                      Price-Change:{" "}
                      <span className="text-red-500">
                        {coin.price_change_percentage_24h}%
                      </span>
                    </p>
                  ) : (
                    <p>
                      Price-Change:{" "}
                      <span className="text-green-500">
                        {coin.price_change_percentage_24h}%
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Layout>
    </>
  );
};

export default CardCoin;
