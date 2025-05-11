import React, { useState } from 'react';
import { ProductWithDetails } from '../types/Product';
import { Edit, Trash2, Eye, X, Check } from 'lucide-react';

interface ProductItemProps {
    product: ProductWithDetails;
    onDelete: (id: string) => void;
    onEdit: (product: ProductWithDetails) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState<ProductWithDetails>({ ...product });
    const [showPreview, setShowPreview] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'name' || name === 'price') {
            setEditedProduct({
                ...editedProduct,
                detail: {
                    ...editedProduct.detail,
                    [name]: name === 'price' ? parseFloat(value) : value
                }
            });
        } else {
            setEditedProduct({
                ...editedProduct,
                [name]: value
            });
        }
    };

    const handleSave = () => {
        onEdit(editedProduct);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedProduct({ ...product });
        setIsEditing(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200">
            <div className="md:flex">
                {/* Thumbnail Image */}
                <div className="md:w-1/4 h-48 overflow-hidden">
                    <img
                        src={product.thumbnailImage.url}
                        alt={product.detail.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="p-4 md:w-3/4">
                    {isEditing ? (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.detail.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editedProduct.detail.price}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Loại</label>
                                <select
                                    name="type"
                                    value={editedProduct.type}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                >
                                    <option value="electronics">Điện tử</option>
                                    <option value="figure">Mô hình</option>
                                    <option value="puzzle">Ghép hình</option>
                                    <option value="model">Mô hình</option>
                                    <option value="accessory">Phụ kiện</option>
                                </select>
                            </div>

                            <div className="flex space-x-2 justify-end">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    <X size={16} className="mr-1" /> Hủy
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                >
                                    <Check size={16} className="mr-1" /> Lưu
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold">{product.detail.name}</h3>
                                    <p className="text-lg font-bold text-orange-500 mt-1">{formatPrice(product.detail.price)}</p>
                                    <p className="text-sm text-gray-500 mt-2">Loại: {product.type}</p>
                                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md"
                                    >
                                        <Eye size={16} className="mr-1" /> Xem
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-md"
                                    >
                                        <Edit size={16} className="mr-1" /> Sửa
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="flex items-center px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md"
                                    >
                                        <Trash2 size={16} className="mr-1" /> Xóa
                                    </button>
                                </div>
                            </div>

                            {/* Preview Images */}
                            {showPreview && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold mb-2">Hình ảnh khác</h4>
                                    <div className="flex space-x-2 overflow-x-auto py-2">
                                        {product.previewImages.map((image) => (
                                            <div key={image.id} className="w-24 h-24 flex-shrink-0">
                                                <img
                                                    src={image.url}
                                                    alt={image.description}
                                                    className="w-full h-full object-cover rounded-md"
                                                    title={image.description}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;