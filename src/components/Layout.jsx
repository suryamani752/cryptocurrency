import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const { setSearch, search, filteredCoin } = useContext(CryptoContext); 

  return (
    <>
      <div className="lg:flex md:flex lg:justify-around md:justify-around lg:items-center md:items-center p-3 sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="py-2">
          <Link to="/">
            <p className="text-gray-200 text-2xl">CryptoCurrency</p>
          </Link>
        </div>
        <div className="py-2 relative">
          <i className="ri-search-line absolute top-6 lg:px-2 px-1 text-2xl text-gray-400"></i>
          <input
            className="text-2xl rounded-[10px] lg:pr-10 lg:pl-10 pr-0 pl-10 py-3 focus:outline-none focus:caret-green-500"
            type="text"
            placeholder="Enter desired currency...."
            onChange={(e) => setSearch(e.target.value)}
            value={search} 
          />
        </div>
      </div>

      {/* Check if no filtered coins are found and display an error in the center */}
      {filteredCoin.length === 0 && search && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl text-red-500">
            No cryptocurrency found with the name "{search}"
          </p>
        </div>
      )}
      {children}
    </>
  );
};

export default Layout;
