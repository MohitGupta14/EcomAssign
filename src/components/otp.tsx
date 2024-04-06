import React, { useState, useRef } from "react";

const OtpHandler: React.FC<{ email: string }> = ({ email }) => {

  const OtpComponent = () => {
    return (
      <div className="container mx-auto">
        <div className="mx-auto max-w-sm md:max-w-lg">
          <div className="w-full">
            <div className="h-64 rounded bg-white py-3 text-center">
              <div className="mt-4 flex flex-col mb-10">
                <span>Enter the OTP you received at</span>
                <span className="font-medium">{email}</span>
              </div>
              <div
                id="otp"
                className="flex flex-row justify-center px-2 text-center"
              >
                <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="first"
                />
                <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="second"
                />
                <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="third"
                />
                <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="fourth"
                />
                <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="fifth"
                />
                <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="sixth"
                />
                 <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="seventh"
                />
                 <input
                  className="form-control m-2 h-10 w-10 rounded border text-center"
                  type="text"
                  id="eight"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex items-center justify-center mt-8 p-4 md:p-2">
      <div className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow-md md:w-2/3 md:p-8 lg:w-1/2 xl:w-1/3">
        <h2 className=" text-center text-xl font-medium md:text-2xl ">
          Verify your email
        </h2>
        <OtpComponent />
        <div className="flex-wrap mb-4">
        <button type="submit" className="bg-black text-white font-medium py-2 px-4 rounded-md w-full" >VERIFY</button>

        </div>
      </div>
    </div>
  );
};

export default OtpHandler;
