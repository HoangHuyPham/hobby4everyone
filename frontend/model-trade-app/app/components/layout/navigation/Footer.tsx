// components/layout/ExactFooter.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='w-full'>
      {/* Main Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Information Column */}
            <div className='border-r border-gray-700 '>
              <h3 className="text-lg font-medium mb-4">INFORMATION</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-blue-300">Help Center</Link></li>
                <li><Link href="/guide" className="hover:text-blue-300">New Customer Guide</Link></li>
                <li><Link href="/shipping" className="hover:text-blue-300">Shipping Methods</Link></li>
                <li><Link href="/payment" className="hover:text-blue-300">Payment Methods</Link></li>
                <li><Link href="/status" className="hover:text-blue-300">Stock Status</Link></li>
                <li><Link href="/terms" className="hover:text-blue-300">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* My Account Column */}
            <div className='border-r border-gray-700'>
              <h3 className="text-lg font-medium mb-4">MY ACCOUNT</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/warehouse" className="hover:text-blue-300">Private Warehouse</Link></li>
                <li><Link href="/account" className="hover:text-blue-300">Account Details</Link></li>
                <li><Link href="/orders" className="hover:text-blue-300">Order History</Link></li>
                <li><Link href="/payment-method" className="hover:text-blue-300">Payment Method</Link></li>
                <li><Link href="/profile" className="hover:text-blue-300">Corporate Profile</Link></li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div>
              <h3 className="text-lg font-medium mb-4">FOLLOW US</h3>
              <p className="text-sm mb-4">
                Be the first to hear about new products, events and special offers.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full text-sm transition duration-200">
                  Sign up for our newsletter
                </button>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3 mb-6">
                <Link href="#" className="text-white hover:text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                  </svg>
                </Link>
              </div>
              
              {/* Currency Dropdown */}
              <div className="relative">
                <select className="bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 w-full appearance-none cursor-pointer text-sm">
                  <option>Prices in: VND</option>
                  <option>Prices in: USD</option>
                  <option>Prices in: EUR</option>
                  <option>Prices in: JPY</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods and Copyright */}
      <div className="bg-white ">
        <div className="container mx-auto ">
          {/* Payment Methods */}
          {/* <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="text-[#4d148c] font-bold text-xl">FedEx</div>
              <div className="bg-yellow-400 text-red-600 font-bold px-2 py-1 text-sm">DHL</div>
              <div className="flex items-center">
                <div className="bg-blue-500 text-white px-2 py-1 rounded-l text-sm font-bold">Pay</div>
                <div className="bg-blue-700 text-white px-2 py-1 rounded-r text-sm font-bold">Pal</div>
              </div>
              <div className="flex space-x-1">
                <div className="bg-blue-600 w-6 h-4 rounded"></div>
                <div className="bg-red-600 w-6 h-4 rounded"></div>
                <div className="bg-blue-300 w-6 h-4 rounded"></div>
              </div>
            </div>
          </div> */}
          
          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm mt-6 mb-6">
            All contents © 2024 HobbyLink Japan Ltd. Koishikawa Bld 1F, 1-20-7, Koishi, Bunkyo 112-0002 JAPAN
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed bottom-5 left-5 z-50">
        <button className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
