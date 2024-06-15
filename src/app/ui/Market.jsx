// src/CryptoPrices.js
"use client"
import React, { useState, useEffect } from 'react';

const Market = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
        const data = await response.json();
        setPrices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <>
      <div className='from-slate-900 to-slate-800 bg-gradient-to-tl rounded-xl   p-5  w-full text-white'>
        <div>
          <p className='font-semibold text-2xl'>Cryptocurrency Prices by Market Cap</p>
          <p className='text-sm text-slate-400'>Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on a decentralized network. It allows for secure, fast, and low-cost transactions without the need for a central authority.</p>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full mt-5'>
              <thead className='w-full'>
                <tr className=' xs:text-xs md:text-sm xl:text-base' >
                  <th>Coin Name</th>
                  <th>Coin Price</th>
                  <th>24h Change (%)</th>
                  <th>24h High Price</th>
                  <th>24h Low Price</th>
                </tr>
              </thead>
              <tbody >
                {prices.map((coin) => (
                  <tr key={coin.name} className='bg-slate-950 text-sm' >
                    <td className='flex gap-3 p-2'>
                      <img
                        src={`${coin.image}`}
                        width={20}
                        height={20}
                        className="hidden md:block"
                        alt="image"
                      />
                      <p>  {coin.name}</p>
                      <div className='bg-slate-800 text-xs p-1 rounded-md uppercase text-blue-700'>
                        <p>{coin.symbol}</p>
                      </div>
                    </td>
                    <td>
                      <p >${coin.current_price}</p>
                    </td>
                    <td className={` ${coin.market_cap_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {coin.market_cap_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>
                      ${coin.high_24h}
                    </td>
                    <td className=''>

                      ${coin.low_24h}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}
      </div>
    </>
  );
};

export default Market;
