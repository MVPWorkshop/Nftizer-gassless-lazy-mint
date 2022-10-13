import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMetamask, useNetwork, useNetworkMismatch, useAddress, useContract, ChainId } from "@thirdweb-dev/react";
import React, { useState, useEffect } from 'react';


export default function Home() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const contract = useContract("0x52766E09e9cC4866e5CAC2BeeBeBC773EcD5839e", "edition-drop").contract;
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const quantity = 1;

  const items = [
    {
      metadata: {
      id: 0,
      name: "Splet 1",
      image: "https://gateway.ipfscdn.io/ipfs/QmZDtzXcBDAtXWWdhiwPTeGCdeJUan6WjY5eLog9Hw7XHf/0.jpg",
      desc: "Splet ideja, splet oblasti, splet prilika. Hvala vam što ste bili deo SPLET-a i što činite da naš inovacioni ekosistem raste iz dana u dan! Kao simbol zajedničke saradnje i budućih poduhvata, poklanjamo vam NFTeve kreriane od Zombijaninih crteža.",
      }
    },
    {
      metadata: {
      id: 1,
      name: "Splet 2",
      image: "https://gateway.ipfscdn.io/ipfs/QmW2d9nPfPBVpLzFM1Z855iU1ew7FTvVuk2D2YTtrZqrcP/1.jpg",
      desc: "Splet ideja, splet oblasti, splet prilika. Hvala vam što ste bili deo SPLET-a i što činite da naš inovacioni ekosistem raste iz dana u dan! Kao simbol zajedničke saradnje i budućih poduhvata, poklanjamo vam NFTeve kreriane od Zombijaninih crteža.",
      }
    },
    {
      metadata: {
      id: 2,
      name: "Splet 3",
      image: "https://gateway.ipfscdn.io/ipfs/QmNb8BRqfdK7HPYxdv4ki93QAi6oW4m8CtqCb2mTSpG1e6/2.jpg",
      desc: "Splet ideja, splet oblasti, splet prilika. Hvala vam što ste bili deo SPLET-a i što činite da naš inovacioni ekosistem raste iz dana u dan! Kao simbol zajedničke saradnje i budućih poduhvata, poklanjamo vam NFTeve kreriane od Zombijaninih crteža.",
      }
    },
    {
      metadata: {
      id: 3,
      name: "Splet 4",
      image: "https://gateway.ipfscdn.io/ipfs/QmdieCU7yUugGBu52i9CnZ4qzYSogBqyNmytgMwy9YNmV6/3.jpg",
      desc: "Splet ideja, splet oblasti, splet prilika. Hvala vam što ste bili deo SPLET-a i što činite da naš inovacioni ekosistem raste iz dana u dan! Kao simbol zajedničke saradnje i budućih poduhvata, poklanjamo vam NFTeve kreriane od Zombijaninih crteža.",
      }
    },
    {
      metadata: {
      id: 4,
      name: "Splet 5",
      image: "https://gateway.ipfscdn.io/ipfs/Qmaim6gPFJhGyUQs7PbuafuL9scLRwKq3Jqaxtz8yu8MdU/4.jpg",
      desc: "Splet ideja, splet oblasti, splet prilika. Hvala vam što ste bili deo SPLET-a i što činite da naš inovacioni ekosistem raste iz dana u dan! Kao simbol zajedničke saradnje i budućih poduhvata, poklanjamo vam NFTeve kreriane od Zombijaninih crteža.",
      }
    },
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

useEffect(() => {
  const getNFTs = async () => {
    try {
      const nfts = await contract.getAll();
      console.log("nfts", nfts);
    } catch(e) {
      // console.log("error", e);
    }
  }

  getNFTs();
});


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
            <p>Find your claimed NFTs on <a href='https://opensea.io/collection/splet-2022-nft-collection' target="_blank" rel="noopener noreferrer"> OpenSea </a><br/>Make sure to check your Hidden section</p>
            or
            <p><a href='https://allthings.how/how-to-add-nft-to-metamask/' target="_blank" rel="noopener noreferrer">Import your NFTs via your Metamask app </a><br/>(contract address: 0x52766E09e9cC4866e5CAC2BeeBeBC773EcD5839e)</p>
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

