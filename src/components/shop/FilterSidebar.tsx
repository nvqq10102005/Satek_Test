import React, { useEffect, useState } from 'react';
import { Checkbox, Collapse } from 'antd';
import { useProduct } from '../../context/ProductContext';
import { ChevronDown } from 'lucide-react';

const { Panel } = Collapse;

// 1. Mapping dữ liệu: Tên hiển thị -> ID gửi lên API
// Bạn hãy điều chỉnh các ID này khớp với database của backend
const FILTER_MAP: any = {
    "categories": {
        "Phụ kiện": "1",
        "Váy": "2",
        "Quần": "3",
        "Áo": "4"
    },
    "genders": {
        "Nam": "male",
        "Nữ": "female"
    },
    "trademarks": {
        "Atlas®": "101",
        "Elsa Peretti®": "102",
        "Paloma Picasso®": "103",
        "Schlumberger®": "104",
        "Tiffany & Co.": "105"
    }
};

// 2. Component Banner giữ nguyên UI
const SidebarBanner = () => (
    <div className="relative mb-10 overflow-hidden group cursor-pointer hidden lg:block">
        <div className="aspect-[3/7] w-full overflow-hidden relative lg:h-[455px]">
            <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="Banner Sidebar"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-6 left-4 w-16 h-16 rounded-full bg-[#1e56a0] flex flex-col items-center justify-center text-white border-2 border-white/20 shadow-lg z-20">
                <span className="text-sm font-bold leading-none">35%</span>
                <span className="text-[8px] uppercase font-bold">Sale Off</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                <span className="text-[#f8ea2b] text-xs font-medium mb-2 uppercase tracking-widest">Big Discounts</span>
                <h2 className="text-white text-3xl font-serif italic mb-6 leading-tight">Best of Men's <br /> Styles</h2>
                <button className="bg-white text-black px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#FFA724] hover:text-white transition-all duration-300">Shop Now</button>
            </div>
        </div>
    </div>
);

// 3. Component con cho từng phần lọc
const FilterSection = ({ title, options, apiKey, mapGroup }: any) => {
    const { setParams, params } = useProduct();

    const handleChange = (checkedValues: any[]) => {
        // Chuyển đổi mảng các Tên (Váy, Áo) thành mảng các ID dựa trên FILTER_MAP
        const mappedIds = checkedValues.map(name => FILTER_MAP[mapGroup][name] || name);

        // Cập nhật params chung. Ví dụ: { cat: "2,3", page: 1 }
        setParams({
            [apiKey]: mappedIds.join(','),
            page: 1 // Luôn về trang 1 khi lọc mới
        });
    };

    return (
        <div className="w-full">
            {/* Desktop Title */}
            <h3 className="hidden lg:block text-[16px] font-bold text-[#121216] mb-5 tracking-tight uppercase">
                {title}
            </h3>

            <Checkbox.Group className="w-full flex flex-col gap-4 mb-8" onChange={handleChange}>
                {options.map((option: string) => (
                    <div key={option} className="flex justify-between items-center w-full group cursor-pointer">
                        <span className="text-[14px] text-[#646464] group-hover:text-black transition-colors">
                            {option}
                        </span>
                        <Checkbox value={option} className="custom-filter-checkbox" />
                    </div>
                ))}
            </Checkbox.Group>
        </div>
    );
};

const FilterSidebar = () => {
    // 1. Logic xác định xem có phải mobile không dựa trên chiều rộng cửa sổ
    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    useEffect(() => {
        // Kiểm tra chiều rộng khi component mount
        if (window.innerWidth >= 1024) {
            // Nếu là Desktop (>= 1024px), mở hết các mục
            setActiveKeys(['1', '2', '3', '4', '5']);
        } else {
            // Nếu là Mobile, đóng hết
            setActiveKeys([]);
        }
    }, []);

    return (
        <aside className="w-full lg:pr-4">
            {/* Banner quảng cáo - Giấu trên mobile để gọn hơn */}
            <div className="hidden lg:block mb-10">
                {/* ... SidebarBanner cũ của bạn ... */}
            </div>

            <Collapse
                ghost
                // Sử dụng state activeKeys để điều khiển đóng/mở ban đầu
                activeKey={activeKeys}
                onChange={(keys) => setActiveKeys(keys as string[])}
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                    <ChevronDown className={`w-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                )}
                className="filter-collapse"
            >
                <Panel header={<span className="font-bold text-[#121216] uppercase text-sm tracking-widest">Danh mục sản phẩm</span>} key="1" className="border-b border-gray-100">
                    <FilterSection mapGroup="categories" apiKey="cat" options={['Phụ kiện', 'Váy', 'Quần', 'Áo']} />
                </Panel>

                <Panel header={<span className="font-bold text-[#121216] uppercase text-sm tracking-widest">Giới tính</span>} key="2" className="border-b border-gray-100">
                    <FilterSection mapGroup="genders" apiKey="field" options={['Nam', 'Nữ']} />
                </Panel>

                <Panel header={<span className="font-bold text-[#121216] uppercase text-sm tracking-widest">Màu sản phẩm</span>} key="3" className="border-b border-gray-100">
                    <FilterSection mapGroup="fields" apiKey="field" options={['Đen', 'Trắng', 'Nâu']} />
                </Panel>

                <Panel header={<span className="font-bold text-[#121216] uppercase text-sm tracking-widest">Size</span>} key="4" className="border-b border-gray-100">
                    <FilterSection mapGroup="fields" apiKey="field" options={['S', 'M', 'L', 'XL']} />
                </Panel>

                <Panel header={<span className="font-bold text-[#121216] uppercase text-sm tracking-widest">Thương hiệu</span>} key="5" className="border-b border-gray-100">
                    <FilterSection mapGroup="trademarks" apiKey="trademark" options={['Atlas®', 'Elsa Peretti®', 'Paloma Picasso®', 'Schlumberger®', 'Tiffany & Co.']} />
                </Panel>
            </Collapse>
        </aside>
    );
};

export default FilterSidebar;