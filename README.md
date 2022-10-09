# Nftizer-gassless-lazy-mint
MVP of a frontend that allows you to mint an NFT from a thirdweb smart contract without the user paying for gas. Gas is payed by the OZ Defender Relayer we fund in advance. 
Also allows creator to allow adding NFT to smart contract post deployment.

yarn install 

yarn dev - to run project locally

# important for .env

## Mumbai
NEXT_PUBLIC_OPENZEPPELIN_URL=https://api.defender.openzeppelin.com/autotasks/cc174255-0cb9-465e-9627-e252ae2da871/runs/webhook/f7a1ae82-ba4f-45b9-a29c-847c7ce5ab77/9nY1GFjGD2eqKEz9wXxRYj

## Polygon mainnet
NEXT_PUBLIC_OPENZEPPELIN_URL=https://api.defender.openzeppelin.com/autotasks/5708a29d-e7cc-440f-b9bb-d4c01312538f/runs/webhook/3e3ed75f-bb65-4b2e-924a-f55a563040d6/DewxzLZKAqyz2MDz17rxAn
