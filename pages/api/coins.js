export default async function handler(req, res) {

  const getCoinsUrl = await fetch(
    // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    'https://api.coincap.io/v2/assets'
  );
  const coin = await getCoinsUrl.json();
  res.status(200).json(coin)
}