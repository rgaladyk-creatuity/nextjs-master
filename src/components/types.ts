import { type Route } from "next";

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
	image: string;
	// image: ProductImageType;
};

export type ProductListType = {
	items: ProductItemType[];
};

export type TopNavType = TopNavItemType[];

export interface TopNavItemType {
	path: Route | URL;
	name: string;
}
