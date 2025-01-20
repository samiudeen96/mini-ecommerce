import { useState } from "react";
import Card from "../components/Card";
import { useEffect } from "react";

const Home = () => {
  const [products, setproducts] = useState([]);

  
  useEffect(() => {
    console.log(products, "products");

    fetch('/api/products')
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setproducts(res.products)
      });
  }, []);

  return (
    <>
      <div>
        <div className="text-center">
          <h1 className="font-semibold text-3xl">Latest Products</h1>
        </div>
        <div className="flex gap-10">
          {products.map((product) => (
            <Card product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
