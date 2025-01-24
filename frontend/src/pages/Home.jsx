import { useState, useEffect } from "react";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(`/api/products?${searchParams}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return <p className="text-center">Loading products...</p>;
  }

  return (
    <div className="my-10">
      <div className="text-center">
        <h1 className="font-semibold text-3xl">Latest Products</h1>
      </div>
      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-5">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;