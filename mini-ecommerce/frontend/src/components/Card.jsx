const Card = ({product}) => {
    return (
        <>
            <div className="border w-80 flex flex-col items-center min-h-80">
                <div className="w-24 p-5">
                    <img className="object-contain" src="/images/oppo.jpg" alt="" />
                </div>
                <div className="p-2">
                    <p>{product.name}</p>
                </div>
                <div className="p-2">
                    <p>ratings</p>
                </div>
                <div className="p-2">
                    <p>price</p>
                </div>
                <div className="p-2">
                    <button className="">Button</button>
                </div>
            </div>
        </>
    )
};

export default Card;