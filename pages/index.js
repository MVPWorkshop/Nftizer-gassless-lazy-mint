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
  let tokenId = 0;
  const quantity = 1;
  const items = [
  {
    metadata: {
    id: 0,
    name: "Very cool Splet NFT v1",
    image: "https://gateway.ipfscdn.io/ipfs/QmdzgyihfTR3XD95389e8AudHoukdJsA5gZzA7L8zk6zM8/0.png",
    desc: "Very cool Splet NFT v1 description with an in-depth analysis of the content of mentioned NFT. Fascinating. Quite fascinating. ",
    }
  },
  {
    metadata: {
    id: 1,
    name: "Very cool Splet NFT v2",
    image: "https://gateway.ipfscdn.io/ipfs/QmdzgyihfTR3XD95389e8AudHoukdJsA5gZzA7L8zk6zM8/0.png",
    desc: "Very cool Splet NFT v1 description with an in-depth analysis of the content of mentioned NFT. Fascinating. Quite fascinating. ",
    }
  },
  {
    metadata: {
    id: 2,
    name: "Very cool Splet NFT v3",
    image: "https://gateway.ipfscdn.io/ipfs/QmdzgyihfTR3XD95389e8AudHoukdJsA5gZzA7L8zk6zM8/0.png",
    desc: "Very cool Splet NFT v1 description with an in-depth analysis of the content of mentioned NFT. Fascinating. Quite fascinating. ",
    }
  },
];


// let items = [];
// const [items, setItems] = useState({});

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


// async function getNFTs() {
//   return await contract.getAll();
//   };


useEffect(() => {
  const getNFTs = async () => {
    try {
      const nfts = await contract.getAll();
      // console.log("nfts", nfts);
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
            <a href="https://www.splet.rs/" target="_blank" rel="noopener noreferrer">
            <img className={styles.splet} src="/splet22-logo.svg" alt="Splet 2022 logo"></img>
            </a>
            <a href="https://nftizer.net/" target="_blank" rel="noopener noreferrer">
            <img className={styles.nftizer} src="/nftizer-logo-white.svg" alt="Nftizer logo"></img>
            </a>
          </span>
        <h1 className={styles.title}>
          Claim your Splet 2022 NFTs for free!
        </h1>

        <div className={styles.description}>
            {address ? ( 
              <>
              <p>You are signed in as <br/><span> {address} </span></p>
              <div className={styles.disclaimer}> ⚠️ Disclaimer: <br/>Transactions on the blockchain take time. <br/>Claiming your NFT can take around 20s.</div>
              {isMismatched ? (
                <div className={styles.error} onClick={() => switchNetwork(ChainId.Polygon)}> ❌ Disclaimer: <br/>You are not connected to the correct network <br/> Click here to switch to Polygon Mainnet Network</div>
              ) : (
                <>
                <div className={styles.correct}> ✅ Disclaimer:<br/>You are connected to the correct network <br/> Polygon Mainnet Network</div>

                </>
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
            <p>You can find your claimed NFTs on <a href='https://opensea.io/' target="_blank" rel="noopener noreferrer"> OpenSea </a></p>
            or
            <p>You can <a href='https://allthings.how/how-to-add-nft-to-metamask/' target="_blank" rel="noopener noreferrer">import your NFTs via your Metamask app </a> to view them. <br/>(contract address: 0x54034Ea650C2cA0a5CF723af7f9BEd364c6d1c08)</p>
          </div>

        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
         <div className={styles.grid}>

           { 
           items.length > 0 ? (
            items.map((item, index) => (
 
          <div className={styles.card} key={item.metadata.id}>
            <img src={item.metadata.image} alt={item.metadata.name} className={styles.image} ></img>
            <div className={styles.content}>
            <h3>{item.metadata.name}</h3>
            <p>ID: {item.metadata.id}<br/>{item.metadata.desc}</p>
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
          

          {/* <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}

        </div> 
      </div>

      </main>

    </div>
  )
}

