import { Container } from "@chakra-ui/react";
import { useState } from "react";
import CoinList from "../components/CoinList";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

export default function Home({ coinsData }) {

  const [search, setSearch] = useState('');

  const filteredCoins = coinsData.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  const handleChange = e => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  }

  return (
    <Layout title="Crypto">
      <Container maxW="container.md">
       <SearchBar type='text' placeholder='Search' onChange={handleChange} />
        <CoinList coinsData={filteredCoins} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
  );

  const coinsData = await res.json();

  return { props: { coinsData } };
}
