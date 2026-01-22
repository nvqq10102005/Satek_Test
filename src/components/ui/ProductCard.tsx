import { Star } from 'lucide-react';

interface ProductCardProps {
    item: any; // TODO: replace bằng type chuẩn khi có
}

const ProductCard = ({ item }: ProductCardProps) => {
    const price = item?.product?.price ?? 0;
    const discount = item?.product?.discount ?? 0;

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);

    return (
        <div className="group cursor-pointer">
            {/* IMAGE */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                {/* BADGES */}
                {discount !== null && discount !== undefined && discount > 0 && (
                    <div className="absolute top-2 left-0 z-10 flex flex-col gap-1">
                        {/* Nhãn "Nổi bật" đi kèm với giảm giá */}
                        <span className="bg-[#ff4d24] text-white text-[12px] px-4 py-1 font-normal shadow-sm">
                            Nổi bật
                        </span>

                        {/* Nhãn % Giảm giá */}
                        <span className="bg-[#ff4d24] text-white text-[12px] px-4 py-1 font-normal shadow-sm">
                            -{discount}%
                        </span>
                    </div>
                )}
                <img
                    src={item?.image || '/images/placeholder.jpg'}
                    alt={item?.title || 'Product image'}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
            </div>

            {/* INFO */}
            <div className="mt-4 space-y-1">
                <h3 className="text-sm text-[#121216] font-normal line-clamp-2 min-h-[40px] leading-tight hover:text-blue-600 transition-colors">
                    {item?.title || 'Đang cập nhật'}
                </h3>

                <p className="text-[#2b38d1] font-bold text-base">
                    {formattedPrice}
                </p>

                {/* RATING (mock) */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className="fill-[#ffb800] text-[#ffb800]"
                        />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">1</span>
                </div>

                {/* COLOR SWATCHES (mock) */}

            </div>
        </div>
    );
};

export default ProductCard;
