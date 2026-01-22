import React, { createContext, useContext, useState, useEffect } from 'react';
import instance from '../services/axios.customize';

interface ProductContextType {
    products: any[];
    pagination: any;
    loading: boolean;
    params: any;
    setParams: (newParams: any) => void;
    refresh: () => void;
    getSearchSuggestions: (text: string) => Promise<any[]>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);



export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<any[]>([]); // Luôn khởi tạo là mảng rỗng
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        type: 1,
        limit: 12,
        page: 1,
        text: '',
        orderBy: 'time:desc',
    });

    const getSearchSuggestions = async (text: string) => {
        if (!text) return [];
        try {
            const res: any = await instance.get('/search', {
                params: {
                    text: text,
                    type: 1,
                    limit: 5 // Chỉ lấy 5 kết quả gợi ý cho nhanh
                }
            });
            return res?.data || [];
        } catch (error) {
            return [];
        }
    };
    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Log params để xem có bị gửi thiếu gì không
            console.log("Đang gọi API với params:", params);

            const res: any = await instance.get('/search', {
                params: {
                    ...params,
                    // Đảm bảo luôn có type=1 nếu backend yêu cầu bắt buộc
                    type: params.type || 1
                }
            });

            console.log("Kết quả nhận được từ Interceptor:", res);

            // Theo interceptor mới, 'res' chính là body { data: [], meta: {} }
            if (res && Array.isArray(res.data)) {
                setProducts(res.data);
                setPagination(res.meta?.pagination || null);
            } else {
                console.warn("Cấu trúc API không như mong đợi:", res);
                setProducts([]);
            }
        } catch (error) {
            console.error("Lỗi kết nối API:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [params]);

    return (
        <ProductContext.Provider value={{
            products, pagination, loading, params,
            setParams: (newParams) => setParams({ ...params, ...newParams }),
            refresh: fetchProducts,
            getSearchSuggestions
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProduct must be used within ProductProvider");
    return context;
};