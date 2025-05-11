export interface ProductDetail {
    id: string;
    name: string;
    price: number;
}

export interface Product {
    id: string;
    productDetail: string; // foreign key to ProductDetail
    thumbnailImage: string; // foreign key to Image
    type: string;
}

export interface Image {
    id: string;
    url: string;
    description: string;
    createdAt: string;
}

export interface PreviewImage {
    id: string;
    idImage: string; // foreign key to Image
    idProduct: string; // foreign key to Product
}

export interface CartItem {
    id: string;
    cart: string; // foreign key to Cart
}

// Extended Product type combining data from related tables
export interface ProductWithDetails {
    id: string;
    type: string;
    detail: {
        id: string;
        name: string;
        price: number;
    };
    thumbnailImage: {
        id: string;
        url: string;
        description: string;
        createdAt: string;
    };
    previewImages: {
        id: string;
        url: string;
        description: string;
        createdAt: string;
    }[];
}

export const mockProducts: ProductWithDetails[] = [
    {
        id: "1",
        type: "electronics",
        detail: {
            id: "101",
            name: "Mô hình Gundam RX-78-2",
            price: 1200000,
        },
        thumbnailImage: {
            id: "201",
            url: "https://placehold.co/600x400?text=Gundam+RX-78-2",
            description: "Mô hình Gundam RX-78-2 chính hãng",
            createdAt: "2025-01-15T08:30:00Z",
        },
        previewImages: [
            {
                id: "301",
                url: "https://placehold.co/600x400?text=Gundam+Preview+1",
                description: "Gundam RX-78-2 góc nhìn trước",
                createdAt: "2025-01-15T08:31:00Z",
            },
            {
                id: "302",
                url: "https://placehold.co/600x400?text=Gundam+Preview+2",
                description: "Gundam RX-78-2 góc nhìn sau",
                createdAt: "2025-01-15T08:32:00Z",
            }
        ]
    },
    {
        id: "2",
        type: "figure",
        detail: {
            id: "102",
            name: "Mô hình Naruto Uzumaki",
            price: 850000,
        },
        thumbnailImage: {
            id: "202",
            url: "https://placehold.co/600x400?text=Naruto+Figure",
            description: "Mô hình Naruto Uzumaki cao cấp",
            createdAt: "2025-02-10T10:15:00Z",
        },
        previewImages: [
            {
                id: "303",
                url: "https://placehold.co/600x400?text=Naruto+Preview+1",
                description: "Naruto tư thế chiến đấu",
                createdAt: "2025-02-10T10:16:00Z",
            }
        ]
    },
    {
        id: "3",
        type: "puzzle",
        detail: {
            id: "103",
            name: "Puzzle One Piece 1000 mảnh",
            price: 450000,
        },
        thumbnailImage: {
            id: "203",
            url: "https://placehold.co/600x400?text=One+Piece+Puzzle",
            description: "Puzzle One Piece 1000 mảnh phiên bản giới hạn",
            createdAt: "2025-03-05T14:20:00Z",
        },
        previewImages: [
            {
                id: "304",
                url: "https://placehold.co/600x400?text=Puzzle+Preview+1",
                description: "Puzzle One Piece hoàn thiện",
                createdAt: "2025-03-05T14:21:00Z",
            },
            {
                id: "305",
                url: "https://placehold.co/600x400?text=Puzzle+Preview+2",
                description: "Puzzle One Piece chi tiết",
                createdAt: "2025-03-05T14:22:00Z",
            }
        ]
    },
    {
        id: "4",
        type: "model",
        detail: {
            id: "104",
            name: "Mô hình tàu Thousand Sunny",
            price: 1800000,
        },
        thumbnailImage: {
            id: "204",
            url: "https://placehold.co/600x400?text=Thousand+Sunny",
            description: "Mô hình tàu Thousand Sunny One Piece",
            createdAt: "2025-04-20T09:45:00Z",
        },
        previewImages: [
            {
                id: "306",
                url: "https://placehold.co/600x400?text=Sunny+Preview+1",
                description: "Tàu Thousand Sunny góc nhìn bên cạnh",
                createdAt: "2025-04-20T09:46:00Z",
            },
            {
                id: "307",
                url: "https://placehold.co/600x400?text=Sunny+Preview+2",
                description: "Tàu Thousand Sunny góc nhìn từ trên",
                createdAt: "2025-04-20T09:47:00Z",
            }
        ]
    },
    {
        id: "5",
        type: "accessory",
        detail: {
            id: "105",
            name: "Bộ cosplay Demon Slayer",
            price: 1500000,
        },
        thumbnailImage: {
            id: "205",
            url: "https://placehold.co/600x400?text=Demon+Slayer+Cosplay",
            description: "Bộ cosplay Demon Slayer - Tanjiro",
            createdAt: "2025-05-12T16:30:00Z",
        },
        previewImages: [
            {
                id: "308",
                url: "https://placehold.co/600x400?text=Cosplay+Preview+1",
                description: "Cosplay Demon Slayer - Chi tiết kiếm",
                createdAt: "2025-05-12T16:31:00Z",
            },
            {
                id: "309",
                url: "https://placehold.co/600x400?text=Cosplay+Preview+2",
                description: "Cosplay Demon Slayer - Chi tiết áo",
                createdAt: "2025-05-12T16:32:00Z",
            }
        ]
    }
];