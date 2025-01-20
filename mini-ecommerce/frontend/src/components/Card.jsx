import Rating from "./Rating";

const Card = ({ product }) => {
  return (
    <>
      <div className="w-80 flex flex-col items-center min-h-80">
        <div className="w-32 py-3">
          <img
            className="object-contain"
            src={product.images[0].image}
            alt=""
          />
        </div>
        <div className="px-3 pb-2 text-center">
          <p>{product.name}</p>
          {/* <p>{product.description}</p> */}
        </div>
        <div className="p-1 ratings flex gap-2 items-center">
          <div><Rating rating={product.ratings} /></div>
          <div className="text-xs">{product.ratings}</div>
        </div>
        <div className="p-1">
          <p>${product.price}</p>
        </div>
        <div className="p-3 w-full">
          <button className="text-sm bg-blue-950 text-white py-2 w-full rounded-sm hover:bg-blue-800 transition duration-200">
            View details
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
