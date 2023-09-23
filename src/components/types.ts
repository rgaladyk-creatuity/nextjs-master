export type ProductImageType = {
	src: string;
	alt: string;
};

export type ProductItemType = {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	stock_quantity: number;
	image: ProductImageType;
};

export type ProductListType = {
	items: ProductItemType[];
};
