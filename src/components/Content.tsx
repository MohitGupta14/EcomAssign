import React, { useState, useEffect } from 'react';
import { api } from '@component/utils/api';

const Content = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const { data } = api.post.getInterests.useQuery();

  // Function to fetch interests from the database
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        if (data) {
          const interestsArray = Object.values(data);
          setInterests(interestsArray);
        }
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
    fetchInterests();
  }, [data]);

  // Function to handle checkbox toggle
  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Function to handle page change
  const paginate = (pageNumber: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(interests.length / itemsPerPage);

  // Generate an array of page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine starting and ending indices of displayed page numbers
  let startPage = currentPage;
  let endPage = currentPage + 5; // Show up to 6 pages

  if (endPage > totalPages) {
    endPage = totalPages;
  }

  if (startPage > totalPages - 5) {
    startPage = totalPages - 5;
  }

  if (startPage < 1) {
    startPage = 1;
  }

  // Render pagination buttons
  return (
    <div className="flex justify-center items-center p-4 md:p-8">
      <div className="bg-white rounded-xl border border-gray-300 p-4 md:p-8 shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-xl md:text-2xl text-center font-medium mb-4">Please mark your interests!</h2>
        <h4 className="text-sm text-center font-light mb-4">We will keep you notified</h4>
        <form className="px-2 md:px-8">
          <h4 className="text-base font-medium mb-1 md:mb-4">My saved interests</h4>
          {interests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((interest) => (
            <div key={interest} className="flex items-center mb-4 ">
              <input
                type="checkbox"
                id={interest}
                checked={selectedInterests.includes(interest)}
                onChange={() => handleToggleInterest(interest)}
              />
              <label htmlFor={interest} className="ml-2">
                {interest}
              </label>
            </div>
          ))}
          <nav>
            <div className="pagination flex flex-wrap p-4 justify-center mt-4">
              {startPage > 1 && (
                <button className="page-item ml-2" onClick={(e) => paginate(startPage - 1, e)}>
                  {'<'}
                </button>
              )}
              {pageNumbers.slice(startPage - 1, endPage).map((pageNumber, index) => (
                <button
                  key={index}
                  className={`page-item ${pageNumber === currentPage ? 'active' : ''} ml-3`}
                  onClick={(e) => paginate(pageNumber, e)}
                >
                  {pageNumber}
                </button>
              ))}
              {endPage < totalPages && (
                <button className="page-item ml-2" onClick={(e) => paginate(endPage + 1, e)}>
                  {'>'}
                </button>
              )}
            </div>
          </nav>
        </form>
      </div>
    </div>
  );
};

export default Content;
