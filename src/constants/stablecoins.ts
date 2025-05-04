export interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
  countries: string[];
  address: `0x${string}`; // Contract address on Celo Alfajores
}

export const stablecoins: Stablecoin[] = [
  {
    id: "cusd",
    name: "Celo Dollar",
    symbol: "cUSD",
    icon: "🇺🇸",
    color: "#10B981",
    countries: ["USA", "Global"],
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a" // Alfajores cUSD
  },
  {
    id: "ceur",
    name: "Celo Euro",
    symbol: "cEUR",
    icon: "🇪🇺",
    color: "#3B82F6",
    countries: ["European Union"],
    address: "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F" // Alfajores cEUR
  },
  {
    id: "creal",
    name: "Celo Brazilian Real",
    symbol: "cREAL",
    icon: "🇧🇷",
    color: "#F59E0B",
    countries: ["Brazil"],
    address: "0xE4D517785D091D3c54818832dB6094bcc2744545" // Alfajores cREAL
  }
];

export const getStablecoinById = (id: string): Stablecoin | undefined => {
  return stablecoins.find(coin => coin.id === id);
};

export const getDefaultStablecoin = (): Stablecoin => {
  return stablecoins[0]; // cUSD is default
};