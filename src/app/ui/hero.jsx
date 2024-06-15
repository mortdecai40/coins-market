"use client"
import { Result } from 'postcss';
import React from 'react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import Image from 'next/image';
import Market from './Market';
import { FaEthereum } from "react-icons/fa";
import { FaBitcoinSign } from "react-icons/fa6";


export const Hero = () => {
    const [accountDisplay, setAccountDisplay] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [connectText, setConnectText] = useState(null)
    const [loading, setLoading] = useState(true);


    const accountChangeHandler = (newAccount) => {
        setAccountDisplay(newAccount);
        getUserBalance(newAccount);
    }
    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangeHandler(result[0]);
                })
        } else {
            setErrorMessage('install metamask')
        }
    }



    const getUserBalance = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
            .then(balance => {
                setUserBalance(ethers.formatEther(balance));
            })
    }

    const chainChangeHandler = () => {
        window.location.reload();
    }
    return (
        <>

            <div className='w-full bg-slate-900 text-white text-base h-20  flex justify-between px-8 items-center '>
                <div className='text-blue-700 flex items-center text-left text-2xl font-extrabold '>
                    <FaBitcoinSign className='size-[35px]' />
                    <p className='xs:hidden 2xl:block md:block lg:block'>Coin Market</p>
                </div>
                <div className='text-right'>

                    {connectText}

                    <button type='button' onClick={connectWallet} className='px-4 py-2 w-40 bg-blue-700 text-white font-semibold rounded-full' name='connect'>Connect</button>
                </div>
            </div>



            <div className='bg-slate-950  h-screen w-full text-white p-4  flex flex-col gap-5 justify-center xl:py-28 md:py-20 md:px-28 xl:px-40'>
                {(accountDisplay || userBalance) && (
                    
                        <div className='from-slate-900 to-slate-900 bg-gradient-to-tl rounded-xl p-5 w-full text-white'>
                            <div className='flex flex-col gap-4'>
                                <div className='font-semibold sm:text-xs xl:text-xl line-clamp-2 flex items-center'>
                                    Address :
                                    {accountDisplay ? (
                                        <>
                                            <div className='ml-1 bg-pink-400 rounded-full font-thin px-2 py-1 text-sm line-clamp-1'>
                                                <div>
                                                    <span className="hidden sm:inline">{accountDisplay}</span>
                                                    <span className="sm:hidden">{accountDisplay.slice(0, 10)}...</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        accountDisplay
                                    )}
                                </div>
                                <div className='font-semibold sm:text-xs xl:text-xl flex '>
                                    <p>Balance : </p>
                                    <div className='flex gap-2 ml-2 items-center'>
                                        {userBalance ? (
                                            <>
                                                {userBalance}
                                                <div className='bg-slate-800 text-xs p-1 rounded-sm text-blue-800'>
                                                    <p>ETH</p>
                                                </div>
                                                <FaEthereum />
                                            </>
                                        ) : (
                                            userBalance
                                        )}
                                    </div>
                                </div>
                                {errorMessage}
                            </div>
                        </div>
                )}

                    <Market />
            </div>
        </>
    )
}
