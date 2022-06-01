import { fetcher } from '../../utils/api';

const getSearchCoins = (terms) =>
// `https://api.coingecko.com/api/v3/search?query=${terms}`;
`https://api.coincap.io/v2/assets?search=${terms}`;

export default async function handler(req, res) {
  const results = await fetcher(getSearchCoins(req.query.terms));

  res.status(200).json(results);
}



