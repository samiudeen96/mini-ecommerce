import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <div className="searchbar ">
        <div className="flex items-center border rounded-sm shadow-sm h-8 bg-white overflow-hidden">
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            onBlur={searchHandler}
            placeholder="Search by product name ...."
            className="w-64 focus:outline-none py-1 px-3"
          />
          <button
            onClick={searchHandler}
            className="bg-yellow-500 hover:bg-yellow-400 w-7 h-full flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                  fill="#172554"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
