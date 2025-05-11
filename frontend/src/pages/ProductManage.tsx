import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import ProductItem from '../components/ProductItem';
import { mockProducts, ProductWithDetails } from '../types/Product';
import { Plus, Search } from 'lucide-react';

const ProductManage: React.FC = () => {
    const [products, setProducts] = useState<ProductWithDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('all');

    useEffect(() => {
        // Load mock data
        setProducts(mockProducts);
    }, []);

    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const handleEditProduct = (editedProduct: ProductWithDetails) => {
        setProducts(products.map(product =>
            product.id === editedProduct.id ? editedProduct : product
        ));
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.detail.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || product.type === filterType;
        return matchesSearch && matchesType;
    });

    const productTypes = ['all', ...Array.from(new Set(products.map(p => p.type)))];

    return (
        <div className="min-h-screen bg-gray-50">
            <TopBar />

            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center">
                        <Plus size={20} className="mr-2" /> Thêm sản phẩm
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-md"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>

                        <div className="md:w-1/4">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            >
                                {productTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === 'all' ? 'Tất cả loại' : type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductItem
                                key={product.id}
                                product={product}
                                onDelete={handleDeleteProduct}
                                onEdit={handleEditProduct}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductManage;