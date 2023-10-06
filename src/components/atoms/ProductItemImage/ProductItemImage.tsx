import NextImage from "next/image";

export const ProductItemImage = ({ image }: { image: string }) => {
	if (!image?.length) {
		return null;
	}

	return (
		<div className="relative mb-4 h-40">
			{image && <NextImage src={image} alt="alt" width={80} height={80} />}
		</div>
	);
};
