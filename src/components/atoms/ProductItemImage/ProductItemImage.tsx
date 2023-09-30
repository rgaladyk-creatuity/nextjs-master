export const ProductItemImage = ({ image }: { image: string }) => {
	if (!image) {
		return null;
	}

	return (
		<div className="relative mb-4 h-40">
			<img src={image} alt="alt" className="mx-auto h-full w-auto" />
		</div>
	);
};
