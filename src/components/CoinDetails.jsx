import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [timer, setTimer] = useState(60); 

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(res.data);
        setError("");
      } catch (error) {
        if (error.res && error.res.status === 429) {
          setError("Rate limit exceeded. Please wait a moment and try again.");
          if (retryCount < 3) {
            setRetryCount(retryCount + 1);
            setTimeout(fetchCoinDetails, 1000 * retryCount); 
          }
        } else {
          setError("Rate limit exceeded. Please wait a moment and try again.");
          let countdown = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer <= 1) {
                clearInterval(countdown);
                window.location.reload(); 
                return 60; 
              }
              return prevTimer - 1;
            });
          }, 1000);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();
  }, [id, retryCount]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader loading={loading} size={25} color="#007bff" />
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-2xl text-center">{error}</p>
        {error.includes("Rate limit exceeded") && (
          <p className="text-xl text-gray-600 mt-4">
            Retrying in {timer} seconds...
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="lg:flex md:flex flex lg:flex-col md:flex-col flex-col">
      <div className="lg:flex md:flex flex lg:justify-center md:justify-center justify-center lg:items-center md:items-center items-center lg:mt-5 md:mt-5 mt-7">
        <img src={coin.image.large} alt={coin.name} width={180} />
      </div>
      <div className="lg:grid md:grid grid lg:grid-cols-2 md:grid-cols-2 lg:mx-16 md:mx-10 lg:p-10 md:p-7 lg:gap-2 md:gap-2 gap-5 p-5">
        <div className="flex flex-col border-4 px-12 py-4 rounded-[15px] w-fit h-fit lg:gap-4 md:gap-4 gap-3 text-xl">
          <h1>Name: {coin.name}</h1>
          <p>Symbol: {coin.symbol}</p>
          <p>
            Market Cap: Rs.{coin.market_data.market_cap.inr.toLocaleString()}
          </p>
          {coin?.market_data.price_change_percentage_24h < 0 ? (
            <p>
              Price Change % in 24 Hrs:{" "}
              <span className="text-red-500">
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%{" "}
              </span>
            </p>
          ) : (
            <p>
              Price Change % in 24 Hrs:{" "}
              <span className="text-green-500">
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%{" "}
              </span>
            </p>
          )}

          {coin?.market_data.price_change_24h_in_currency.inr < 0 ? (
            <p>
              Price Change in 24 Hrs in India Rupees: ₹{" "}
              <span className="text-red-500">
                {coin.market_data.price_change_24h_in_currency.inr.toFixed(4)}
              </span>
            </p>
          ) : (
            <p>
              Price Change in 24 Hrs in India Rupees: ₹
              <span className="text-green-500">
                {coin.market_data.price_change_24h_in_currency.inr}
              </span>
            </p>
          )}

          {coin?.market_data.price_change_percentage_1h_in_currency.inr < 0 ? (
            <p>
              Price Change % in 1hr in Indian Rupees:{" "}
              <span className="text-red-500">
                {coin.market_data.price_change_percentage_1h_in_currency.inr.toFixed(
                  3
                )}
                %
              </span>
            </p>
          ) : (
            <p>
              Price Change % in 1hr in Indian Rupees:{" "}
              <span className="text-green-500">
                {coin.market_data.price_change_percentage_1h_in_currency.inr.toFixed(
                  3
                )}
                %
              </span>
            </p>
          )}

          <p>
            Current Price in Indian Rupees: ₹{" "}
            {coin.market_data.current_price.inr.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col border-4 p-10 gap-4 w-fit rounded-[15px]">
          <div
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          />
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-serif font-normal">
                To Know more about this Currency; Here is the official site link
                ----
              </p>
            </div>
            <div>
              <Link
                to={coin.links.homepage[0]}
                target="_blank"
                className="bg-green-400 p-2 text-black font-sans rounded-[10px]"
              >
                Click Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
