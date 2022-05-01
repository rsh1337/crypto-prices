import { fetcher } from '../../../utils/api';

const getCoinUrl = (id) =>
`https://api.coincap.io/v2/assets/${id}/history?interval=d1`;

export default async function handler(req, res) {
  const coin = await fetcher(getCoinUrl(req.query.id));

  res.status(200).json(coin);
}