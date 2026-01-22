import { Pagination } from 'antd';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductCard from '../components/ui/ProductCard';
import { useProduct } from '../context/ProductContext';

const ProductPage = () => {
    // Mock data từ JSON của bạn
    const { products, pagination, loading, setParams } = useProduct();

    const handlePageChange = (page: number) => {
        // 1. Cập nhật tham số trang để gọi API
        setParams({ page });

        // 2. Cuộn lên đầu trang
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 'smooth' để cuộn mượt, hoặc 'auto' để lên ngay lập tức
        });
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-10">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-[280px] flex-shrink-0">
                    <FilterSidebar />
                </div>

                <div className="flex-1">
                    {loading ? (
                        <div className="h-96 flex items-center justify-center font-bold text-gray-400">ĐANG TẢI DỮ LIỆU...</div>
                    ) : (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((item: any) => (
                                    <ProductCard key={item.id} item={item} />
                                ))
                            ) : (
                                !loading && <div className="col-span-3 text-center py-20 text-gray-400">
                                    Không tìm thấy sản phẩm nào phù hợp.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-16 flex justify-center">
                        <Pagination
                            current={pagination?.current_page || 1}
                            total={pagination?.total || 0}
                            pageSize={pagination?.per_page || 12}
                            // Sử dụng hàm handlePageChange mới
                            onChange={handlePageChange}
                            showSizeChanger={false}
                            className="custom-pagination"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;