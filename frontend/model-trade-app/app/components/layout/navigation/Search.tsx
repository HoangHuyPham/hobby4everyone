'use client';
import { useState , useEffect} from 'react';

export default function SearchBar(){
      const [searchQuery, setSearchQuery] = useState('');
    
      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý tìm kiếm
        console.log('Searching for:', searchQuery);
      };

    return(
        <div className=" flex w-full h-full  items-center p-1 ">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="  h-auto w-full  bg-white rounded  flex md:relative md:mr-22 justify-center items-center ">
          <input
            type="text"
            placeholder="search entire store here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:outline-none h-10 items-center justify-center px-2 text-black text-sm  w-full md:h-10"
          />
          <button 
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-1 rounded mr-1 lg:mr-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
    
       
      </div>
    )
}



