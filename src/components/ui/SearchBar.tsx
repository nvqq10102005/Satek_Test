import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useProduct } from '../../context/ProductContext';

const SearchBar = () => {
    const { getSearchSuggestions, setParams } = useProduct();
    const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);

    const handleSearch = async (searchText: string) => {
        if (searchText.length >= 2) {
            const results = await getSearchSuggestions(searchText);
            const formatted = results.map((item: any) => ({
                value: item.title,
                label: (
                    <div className="flex items-center gap-3 py-1">
                        <img
                            src={item.image || '/images/placeholder.jpg'}
                            alt=""
                            className="w-10 h-10 object-cover border border-gray-100 flex-shrink-0"
                        />
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-[#121216] truncate">{item.title}</span>
                            <span className="text-[11px] text-blue-600 font-bold">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product?.price || 0)}
                            </span>
                        </div>
                    </div>
                ),
            }));
            setOptions(formatted);
        } else {
            setOptions([]);
        }
    };

    const onSelect = (value: string) => {
        setParams({ text: value, page: 1 });
    };

    return (
        <div className="w-full search-bar-satek">
            <AutoComplete
                popupMatchSelectWidth={350}
                style={{ width: '100%' }}
                options={options}
                onSearch={handleSearch}
                onSelect={onSelect}
            >
                <Input
                    placeholder="Tìm sản phẩm..."
                    suffix={<SearchOutlined className="text-gray-400 cursor-pointer" />}
                    onPressEnter={(e: any) => onSelect(e.target.value)}
                    style={{ borderRadius: '0px' }}
                    className="h-10 border-gray-200 focus:border-black hover:border-black shadow-none"
                />
            </AutoComplete>
        </div>
    );
};

export default SearchBar;