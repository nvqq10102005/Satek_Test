import { useState } from 'react';
import Header from './components/layout/Header';
import ProductPage from './pages/ProductPage';
import { ProductProvider } from './context/ProductContext';
import { CONFIG } from './contains/config';

function App() {
  return (
    <ProductProvider>

      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* 
         Bỏ max-w-[1400px] ở đây vì các Component con đã tự quản lý Container rồi. 
         Dùng flex-1 để đẩy footer xuống đáy nếu nội dung ít.
      */}

        <main className="flex-1">
          <ProductPage />
        </main>

        <footer className="border-t py-2 flex flex-row justify-between items-center text-[11px] text-[#646464] uppercase tracking-[0.2em] font-medium bg-[#fcfcfc] px-[7%]">
          <div>
            <img src={CONFIG.LOGO} alt="logo" />
          </div>
          Copyright © 2026 SATEK . All Rights Reserved.
        </footer>
      </div >
    </ProductProvider>
  );
}

export default App;

// function App() {
//   const [searchValue, setSearchValue] = useState('');

//   const handleSearch = (value: string) => {
//     setSearchValue(value);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <Header onSearch={handleSearch} />

//       {/* 
//          Bỏ max-w-[1400px] ở đây vì các Component con đã tự quản lý Container rồi. 
//          Dùng flex-1 để đẩy footer xuống đáy nếu nội dung ít.
//       */}
//       <main className="flex-1">
//         {searchValue && (
//           <div className="max-w-[1400px] mx-auto px-10 pt-4 text-gray-500">
//             Kết quả tìm kiếm cho: <strong>{searchValue}</strong>
//           </div>
//         )}
//         <ProductPage />
//       </main>

//       <footer className="border-t py-10 text-center text-[11px] text-[#646464] uppercase tracking-[0.2em] font-medium bg-[#fcfcfc]">
//         Copyright © 2026 SATEK . All Rights Reserved.
//       </footer>
//     </div>
//   );
// }