interface ProductTypes {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}

interface NewProductTypes {
    id?: number;
    title: string;
    description: string;
    price: number;
};

interface ReviewTypes {
    comment: string;
    reviewerName: string;
    date: string;
    rating: number;
}

interface ProductDetailsTypes {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    images?: string[];
    reviews?: ReviewTypes[];
}

export type { ProductTypes, NewProductTypes, ProductDetailsTypes, ReviewTypes }