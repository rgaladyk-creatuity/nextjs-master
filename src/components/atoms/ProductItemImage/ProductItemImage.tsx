import Image from "next/image";
import { type ProductImageType } from "@/components/types";

export const ProductItemImage = ({ image }: { image: ProductImageType }) => {
	return (
		<div className="relative mb-4">
			<Image src={image.src} alt={image.alt} width={200} height={200} className="mx-auto" />
		</div>
	);
};
