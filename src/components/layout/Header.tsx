import { Breadcrumb, Dropdown, Space, type MenuProps } from 'antd';
import SearchBar from '../ui/SearchBar';
import { CONFIG } from '../../contains/config';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';



const Header = () => {
    const { setParams, pagination, params } = useProduct();

    const sortLabels: any = {
        'time:desc': 'Mới nhất',
        'price:desc': 'Giá: Cao đến thấp',
        'price:asc': 'Thấp đến cao',
    };

    // Mapping menu key sang API params
    const handleSort: MenuProps['onClick'] = (e) => {
        const sortMap: any = {
            '0': 'time:desc',
            '1': 'price:desc',
            '3': 'price:asc',
        };
        const newSort = sortMap[e.key];
        // Cập nhật Params -> useEffect trong Context sẽ tự gọi API
        setParams({ orderBy: newSort, page: 1 });
    };


    const items: MenuProps['items'] = [
        { label: 'Mới nhất', key: '0' },
        { type: 'divider' },
        { label: 'Giá: Cao đến thấp', key: '1' },
        { type: 'divider' },
        { label: 'Thấp đến cao', key: '3' },
    ];
    return (
        <header className="w-full bg-white">
            {/* 1. TOP NAV: Logo & Search */}
            <div className="sticky top-0 z-50 bg-white">
                <div className="max-w-[1400px] mx-auto px-4 md:px-10 h-20 flex justify-between items-center">

                    {/* Click vào đây sẽ load lại trang và về URL gốc */}
                    <a href="/" className="flex-shrink-0 cursor-pointer">
                        <img
                            src={CONFIG.LOGO}
                            alt="Satek Logo"
                            className="h-8 w-auto object-contain"
                        />
                    </a>

                    <div className="w-full max-w-[300px]">
                        <SearchBar />
                    </div>
                </div>
            </div>

            {/* 2. BANNER SECTION: Hình ảnh, Tiêu đề & Breadcrumb */}
            <div className="w-full bg-[url('/images/1abdb07e6046fed251f5bfaa0a55500dbff466e4.jpg')] bg-no-repeat bg-center bg-cover overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 flex flex-col md:flex-row justify-between items-center relative z-10">
                    <div className="text-left w-full md:w-1/2">
                        <h1 className="text-5xl font-normal text-gray-800 mb-4">Sản phẩm</h1>
                        <Breadcrumb

                            separator={<ChevronRight className='w-4 text-[#121216]' />}
                            items={[
                                { title: <span className="text-gray-400">Trang Chủ</span> },
                                { title: <span className="text-gray-800 font-medium">Sản Phẩm</span> },
                            ]}
                        />
                    </div>

                    {/* Phần ảnh decor bên phải (Sử dụng URL ảnh của bạn) */}
                    {/* <div className="hidden md:block absolute right-0 bottom-0 h-full">
                        <img
                            src="/images/1abdb07e6046fed251f5bfaa0a55500dbff466e4.jpg" // Thay bằng link ảnh mẫu của bạn
                            className="h-full object-contain object-right"
                            alt="banner decor"
                        />
                    </div> */}
                </div>
            </div>

            {/* 3. TOOLBAR: Hiển thị kết quả & Sắp xếp */}

            <div className="max-w-[1400px] px-4 md:px-10 mx-auto">
                <div className="border-b border-[#DDDDDD] h-16 flex justify-between items-center">
                    <div className="text-sm text-[#000000]">
                        Hiển thị 1-12 trong số {pagination?.total || 0} kết quả
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#000000] whitespace-nowrap">Sắp xếp theo:</span>
                        <Dropdown menu={{ items, onClick: handleSort }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className="text-sm cursor-pointer select-none">
                                    {/* Hiển thị label dựa trên params hiện tại */}
                                    {sortLabels[params.orderBy] || 'Sắp xếp mặc định'}
                                    <ChevronDown className="h-4 text-[#646464]" />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>


        </header>
    );
};

export default Header;