import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptoCoin, setCryptoCoin] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchCryptoCoin = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCryptoCoin(response.data);
      setError("");
    } catch (error) {
      // console.error("Error fetching crypto coins:", error);
      setError("Error fetching crypto coins:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoCoin();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <PacmanLoader loading={loading} size={25} color="#007bff" />
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   console.log("cryptoCoin updated:", cryptoCoin);
  // }, [cryptoCoin]);

  const filteredCoin = cryptoCoin.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  // console.log(filteredCoin);

  return (
    <CryptoContext.Provider
      value={{
        cryptoCoin,
        setCryptoCoin,
        search,
        setSearch,
        filteredCoin,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
