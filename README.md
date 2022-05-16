## Prerequisites
 - @openzeppelin/subgraphs
 - @graphprotocol/graph-cli



## Instruction

# The Graph
1) init subgraph

    graph init --product hosted-service --from-contract <Address>
        Input example:
            + subgraph name: canfoundation/can (created via The Graph hosted service first)
            + folder: can



# Openzeppelin-subgraph Generator

2) Modify subgbraph-config.json with your contract address and modules it supports

3) subgraph-config.json by default redirect generated files to `generated-subgraph-manifest/` folder. Check subgraph-config.json for more details.

4) CD to subgraph-deployment directory
`npm run gen-graph-manifest`

# Merging generated files and deploy subgraph

5) Take the generated files in `generated-subgraph-manifest/` folder and merge those with `schema.graphql` and `subgraph.yaml` of yours (if you have) then put them in in the subgraph folder (in this example it is can/)

6) cd to the subgraph folder (in this example it is can/)
    `npm run codegen`
    `graph auth --product hosted-service <ACCESS_TOKEN>`
    `graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>`
        <ACCESS_TOKEN>: get this in Hosted Service dashboard ()
        <GITHUB_USER>/<SUBGRAPH NAME>: currently it's "canfoundation/can"

Note: For deploying subgraph to index contracts on different networks
https://thegraph.com/docs/en/hosted-service/deploy-subgraph-hosted/#deploying-the-subgraph-to-multiple-ethereum-networks

