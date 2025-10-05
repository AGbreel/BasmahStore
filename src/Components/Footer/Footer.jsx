import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-gray-300 bg-black py-8">
      {/* إضاءة خلفية متحركة */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5 animate-pulse"></div> */}

      {/* المحتوى */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* الأيقونات */}
        <div className="flex space-x-6 text-xl">
          <a
            href="https://www.instagram.com/bas_mahh2?igsh=NTdzajhiOG04eTgw&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse hover:scale-125 transition-transform"></i>
          </a>
          <a
            href="https://www.instagram.com/bas_mahh1?igsh=MzJzMzM0aTEyOWw1&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse hover:scale-125 transition-transform"></i>
          </a>

          <a
            href="https://www.facebook.com/share/17X9srTS1V/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse hover:scale-125 transition-transform"></i>
          </a>
          <a
            href="https://www.facebook.com/share/16ynPMdeYh/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse hover:scale-125 transition-transform"></i>
          </a>

          <a
            href="https://www.tiktok.com/@basmahbrand4?_t=ZS-90C7CU9Jqxl&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-tiktok cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse hover:scale-125 transition-transform"></i>
          </a>
          <a
            href="https://www.tiktok.com/@bas_mah11?_t=ZS-90C7AAG7rZx&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-tiktok cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse hover:scale-125 transition-transform"></i>
          </a>

          <a
            href="https://wa.me/201070606009"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 animate-pulse hover:scale-125 transition-transform"></i>
          </a>

        </div>


        {/* النصوص */}
        <p className="text-sm">© Copyright {year}. All Rights Reserved</p>
        <p className="text-sm">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/ahmedgbreel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse drop-shadow-lg"
          >
            Ahmed Gbreel
          </a>
        </p>
      </div>
    </footer>
  );
}
