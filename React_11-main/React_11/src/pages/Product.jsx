import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Product() {
  let { changeTotal, setChangeTotal } = useGlobalContext();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plas, setPlas] = useState(true);

  let firstElementRef = useRef(null);
  let secondElementRef = useRef(null);
  let mainElementRef = useRef(null);

  let number = 0;

  // functions
  let handlePlus = () => {
    if (firstElementRef.current) {
      mainElementRef.current.textContent = number += 1;
    }
  };

  let handleMinus = () => {
    if (secondElementRef.current) {
      if (number > 0) {
        mainElementRef.current.textContent = number -= 1;
      }
    }
  };

  let varToral;
  let handleAdd = () => {
    varToral = changeTotal += number;

    setChangeTotal(varToral);
    mainElementRef.current.textContent = 0;
    localStorage.setItem("total", varToral);
  };

  function func() {
    setPlas(!plas);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-lg pt-4 max-w-8 mx-auto h-lvh">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          width="200"
          height="200"
          style={{ shapeRendering: "auto", display: "block" }}
        >
          <g>
            <circle
              strokeLinecap="round"
              fill="none"
              strokeDasharray="50.26548245743669 50.26548245743669"
              stroke="#e15b64"
              strokeWidth="8"
              r="32"
              cy="50"
              cx="50"
            >
              <animateTransform
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                repeatCount="indefinite"
                dur="1.1904761904761905s"
                type="rotate"
                attributeName="transform"
              ></animateTransform>
            </circle>
            <circle
              strokeLinecap="round"
              fill="none"
              strokeDashoffset="36.12831551628262"
              strokeDasharray="36.12831551628262 36.12831551628262"
              stroke="#f8b26a"
              strokeWidth="8"
              r="23"
              cy="50"
              cx="50"
            >
              <animateTransform
                values="0 50 50;-360 50 50"
                keyTimes="0;1"
                repeatCount="indefinite"
                dur="1.1904761904761905s"
                type="rotate"
                attributeName="transform"
              ></animateTransform>
            </circle>
          </g>
        </svg>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data && (
        <div className=" py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg  mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={data.thumbnail}
                    alt="Product Image"
                  />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <div className="flex items-center gap-5 flex-wrap">
                  <h2 className="text-2xl font-bold   mb-2">{data.title}</h2>
                </div>
                <p className=" text-sm mb-4">{data.description}</p>
                <div className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold ">Price: </span>
                    <span className="text-yellow-400">${data.price}</span>
                    <p className="pt-2">⭐️ ⭐️ ⭐️ ⭐️ ⭐️ </p>
                  </div>
                  <div>
                    <span className="font-bold  ">brand: </span>
                    <span className="text-blue-500">{data.brand}</span>
                  </div>
                </div>
                <h1 className="text-bold pt-4 text-2xl text-green-600">
                  if you buy two products, the third one is free 🎁
                </h1>

                <div className="flex gap-10 items-baseline">
                  <div className="flex items-center gap-8 mt-10">
                    <button
                      ref={secondElementRef}
                      onClick={handleMinus}
                      className="btn  text-2xl"
                    >
                      -
                    </button>
                    <span ref={mainElementRef}>0</span>
                    <button
                      ref={firstElementRef}
                      onClick={handlePlus}
                      className="btn text-2xl"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="btn hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
