import { useState, useEffect } from "react"; 
// Importing React hooks: useState for managing state and useEffect for performing side effects.
import Card from "../components/Card"; 
// Importing the Card component, which is used to display individual product details.
import { useSearchParams } from "react-router-dom"; 
// Importing the useSearchParams hook to read and update the query parameters in the URL.

const Home = () => {
  // Declaring the Home functional component.

  const [products, setProducts] = useState([]); 
  // State variable `products` initialized as an empty array to store the list of products.
  const [isLoading, setIsLoading] = useState(true); 
  // State variable `isLoading` initialized as `true` to indicate the loading state.
  const [searchParams, setSearchParams] = useSearchParams(); 
  // useSearchParams hook to access and modify query parameters in the URL.

  useEffect(() => {
    // useEffect hook is triggered whenever `searchParams` changes.

    fetch(`/api/products?${searchParams}`)
      // Fetching products from the API with query parameters derived from `searchParams`.
      .then((res) => res.json())
      // Parsing the API response as JSON.
      .then((res) => {
        setProducts(res.products); 
        // Updating the `products` state with the fetched product data.
        setIsLoading(false); 
        // Setting `isLoading` to false after data is loaded.
      });
  }, [searchParams]); 
  // Dependency array ensures that the effect runs whenever `searchParams` changes.

  if (isLoading) {
    // Conditional rendering: If data is still loading, show a loading message.
    return <p className="text-center">Loading products...</p>;
    // Displays a centered loading message while data is being fetched.
  }

  return (
    // Main JSX structure for the Home component.
    <div className="my-10">
      <div className="text-center">
        {/* Header section with a title */}
        <h1 className="font-semibold text-3xl">Latest Products</h1>
      </div>
      {products.length === 0 ? (
        // Conditional rendering: If no products are available, show a message.
        <p className="text-center">No products available.</p>
      ) : (
        // If products are available, display them in a grid layout.
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-5">
          {products.map((product) => (
            // Mapping over the `products` array to render a Card component for each product.
            <Card key={product._id} product={product} />
            // Passing `product` data as a prop to the Card component. Using `product._id` as a unique key.
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
// Exporting the Home component as the default export to be used in other parts of the application.
