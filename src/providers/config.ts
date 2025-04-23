import { createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";
import { defineChain } from "viem";
import { optimismSepolia, sepolia } from "viem/chains";

export const buildbear = defineChain({
  id: 25658,
  name: "BuildBear",
  network: "buildbear",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://rpc.buildbear.io/tense-hulk-76135f78"] },
  },
});

export const config = createConfig({
  chains: [buildbear, sepolia, optimismSepolia],
  transports: {
    [buildbear.id]: http(),
    [sepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
});
