export type ProductType = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: ProductRatingType;
	image: string;
	longDescription: string;
};

export type ProductRatingType = {
	rate: number;
	count: number;
};

type PageParams = {
	params: { productId: string };
};

const getProductData = async (productId: string) => {
	const response = await fetch("https://naszsklep-api.vercel.app/api/products/" + productId);
	const data = (await response.json()) as ProductType;

	return data;
};

export async function generateMetadata({ params }: PageParams) {
	const { title, description } = await getProductData(params.productId);

	return {
		title,
		description,
	};
}

export default async function ProductPage({ params }: PageParams) {
	const { title, description } = await getProductData(params.productId);

	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
		</>
	);
}
