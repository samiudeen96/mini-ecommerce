import { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="font-semibold text-3xl">Latest Products</h1>
      </div>
      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
