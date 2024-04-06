import React from "react";

const Navbar: React.FC = () => {
  return (
    <div>
     <div className="fixed top-0 right-0 p-1">
      <div className="bg-white">
        <div className="flex text-xs justify-end p-1 ">
          <div className="mx-2 font-light text-black">Help</div>
          <div className="mx-2 font-light text-black">Order & Return</div>
          <div className="mx-2 font-light text-black">Hi , John</div>      
        </div>
      </div>
    </div>
      <nav className="bg-grey-800 flex flex-col md:flex-row items-center justify-between p-6 mt-4">
        <div className="ml-2 mt-4 md:mt-0 text-3xl font-semibold text-black">
          ECOMMERCE
        </div>
        <div className="flex flex-wrap justify-center mt-4 md:mt-0">
          <div className="mx-4 font-medium text-black">Categories</div>
          <div className="mx-4 font-medium text-black">Sales</div>
          <div className="mx-4 font-medium text-black">Clearance</div>
          <div className="mx-4 font-medium text-black">New Stock</div>
          <div className="mx-4 font-medium text-black">Trending</div>
          <div className="mx-4 font-medium text-black"></div>
          <div className="mx-4 font-medium text-black"></div>
          <div className="mx-4 font-medium text-black"></div>
        </div>

        <div className="flex items-center text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 30 30"
            style={{ marginRight: "25px" }}
          >
            <path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "10px" }}
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
      </nav>
      <div className="bg-gray-100 p-1 text-center">
        <div className="bg-gray-100 p-1 text-center text-sm">
          <p>&lt;&nbsp;&nbsp;Get 10% off on business sign up&nbsp;&nbsp;&gt;</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
