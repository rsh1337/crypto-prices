import { Container } from "@chakra-ui/react";
import CoinList from "../components/CoinList";
import Layout from "../components/Layout";

export default function Home({ coinsData }) {
  return (
    <Layout title="Crypto">
      <Container maxW="container.md">
        <CoinList coinsData={coinsData} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  );
  const coinsData = await res.json();

  return { props: { coinsData } };
}
