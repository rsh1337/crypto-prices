const Coins = ({ name, price }) => {
    return (
        <div>
            <div>
                <div>
                    <h1>{name}</h1>
                </div>
                <div>
                    <p>${price}</p>
                </div>
            </div>
        </div>
    )
}
export default Coins