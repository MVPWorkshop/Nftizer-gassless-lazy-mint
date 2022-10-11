import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMetamask, useNetwork, useNetworkMismatch, useAddress, useContract, ChainId } from "@thirdweb-dev/react";
import React, { useState, useEffect } from 'react';


export default function Home() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const contract = useContract("0x54034Ea650C2cA0a5CF723af7f9BEd364c6d1c08", "edition-drop").contract;
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  // let tokenId = 0;
  const quantity = 1;

  const items = [
    {
      metadata: {
      id: 3,
      name: "Super",
      image: "https://gateway.ipfscdn.io/ipfs/QmcJYX4LhWf6GxqwwCcUzQ94waSco8tFgwSL9nCqmQ1pfn/3.jpeg",
      desc: "Jira specialist",
      }
    },
    {
      metadata: {
      id: 4,
      name: "Jugo",
      image: "https://gateway.ipfscdn.io/ipfs/QmS3UwtBu2KdubucQ7Cb5s962DKzBL7MfYmSyVFVgyX2dP/4.jpeg",
      desc: "But what if we make it non-fungible",
      }
    },
    {
      metadata: {
      id: 5,
      name: "Miki",
      image: "https://gateway.ipfscdn.io/ipfs/QmNbHJiyH12gggvX1m5TXHFuF8fN9hZXUVL89F8287k12o/5.jpeg",
      desc: "Ćuti, dobro je prošao",
      }
    },
  // {
  //   metadata: {
  //   id: 0,
  //   name: "NFT Name Placeholder",
  //   image: "https://gateway.ipfscdn.io/ipfs/QmdzgyihfTR3XD95389e8AudHoukdJsA5gZzA7L8zk6zM8/0.png",
  //   desc: "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
  //   }
  // },
  // {
  //   metadata: {
  //   id: 1,
  //   name: "NFT Name Placeholder",
  //   image: "https://gateway.ipfscdn.io/ipfs/QmdzgyihfTR3XD95389e8AudHoukdJsA5gZzA7L8zk6zM8/0.png",
  //   desc: "Lorem ipsum lorem ipsum",
  //   }
  // },
  // {
  //   metadata: {
  //   id: 2,
  //   name: "NFT Name Placeholder",
  //   image: "https://gateway.ipfscdn.io/ipfs/QmdzgyihfTR3XD95389e8AudHoukdJsA5gZzA7L8zk6zM8/0.png",
  //   desc: "Lorem ipsum lorem ipsum",
  //   }
  // },
];

const claimNFT = async (id) => {
  switchNetwork(ChainId.Polygon);
  try {
    await contract?.claimTo(address, id, quantity);
    console.log("🎉 NFT claimed successfully!");
    alert("🎉 NFT claimed successfully!");
  } catch (err) {
    console.log("💩 Error claiming NFT: ", err);
  }
};

// useEffect(() => {
//   const getNFTs = async () => {
//     try {
//       const nfts = await contract.getAll();
//       console.log("nfts", nfts);
//     } catch(e) {
//       // console.log("error", e);
//     }
//   }

//   getNFTs();
// });


  return (
    <div className={styles.container}>
      <Head>
        <title>Splet 2022 | Claim your NFTs for free</title>
        <meta name="description" content="Made by Nftizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <span className={styles.logos}>
            <a href="https://nftizer.net/" target="_blank" rel="noopener noreferrer">
            <img className={styles.nftizer} src="/nftizer-logo-white.png" alt="Nftizer logo"></img>
            </a>
          </span>
        <h1 className={styles.title}>
          Claim your Splet Tech Conference 2022 NFTs for free!
        </h1>

        <div className={styles.description}>
            {address ? ( 
              <>
              <p>You are signed in as <br/><span> {address} </span></p>
              <div className={styles.disclaimerClassic}> <img src="/wow.svg"></img> Transactions on the blockchain take time. <br/> <span>Claiming your NFT can take around 20s.</span></div>
              {isMismatched ? (
                <div className={styles.disclaimerError} onClick={() => switchNetwork(ChainId.Polygon)}>  <img src="/no.svg"></img> You are not connected to the correct network <br/> <span>Click here</span> to switch to Polygon Mainnet Network</div>
              ) : (
                <div className={styles.disclaimerCorrect}>  <img src="/yes.svg"></img> You are connected to the correct network <br/> Polygon Mainnet Network</div>
              )}
              </>
            ) : (
              <>
              <div className={styles.button} onClick={connectWithMetamask}>Sign in with Metamask</div>
              <p><a href="https://metamask.io/">Don't have an account?</a></p>
              </>
            )}
          </div>

          <div className={styles.description}>
            <p>Find your claimed NFTs on <a href='https://opensea.io/' target="_blank" rel="noopener noreferrer"> OpenSea </a><br/>Make sure to check Hidden section</p>
            or
            <p><a href='https://allthings.how/how-to-add-nft-to-metamask/' target="_blank" rel="noopener noreferrer">Import your NFTs via your Metamask app </a><br/>(contract address: 0x54034Ea650C2cA0a5CF723af7f9BEd364c6d1c08)</p>
          </div>

        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
         <div className={styles.grid}>

           { 
           items.length > 0 ? (
            items.map((item, index) => (
 
          <div className={styles.card} key={item.metadata.id}>
            <div className={styles.header}>
            <img src={item.metadata.image} alt={item.metadata.name} className={styles.image} ></img>
            </div>
            <div className={styles.content}>
            <span>ID: {item.metadata.id}</span>
            <h3>{item.metadata.name}</h3>
            <p>{item.metadata.desc}</p>
            </div>
            {address ? (
              <div className={styles.button} onClick={ () => claimNFT(item.metadata.id)}>Claim NFT</div>
            ) : (
              <>
              
              </>
            )}
          
          </div>
           )) 

           ) : (
            <>
              
            </>
           )}
        </div> 
      </div>

      </main>

    </div>
  )
}

