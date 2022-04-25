import Coins from "./Coins"

const CoinList = ({ coinsData }) => {
    return (
        <>
            {coinsData.map(coin => {
                return (
                    <Coins
                        name={coin.name}
                        price={coin.current_price}
                    />
                )
            })}
        </>
    )
}
export default CoinList