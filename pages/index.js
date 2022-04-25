import CoinList from "../components/CoinList";


export default function Home({coinsData}) {
  return (
    <div>
      <CoinList coinsData={coinsData}/>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
  const coinsData = await res.json()

  return { props: { coinsData } }
}