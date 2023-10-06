import { type ProductListItemVariantsFragment } from "@/gql/graphql";

export const ProductVariants = ({ variants }: { variants: ProductListItemVariantsFragment[] }) => {
	if (!variants.length) {
		return null;
	}

	return (
		<ul>
			{variants.map((variant, index) => {
				return (
					<li key={index}>
						<input type="radio" name="variant" value={variant.id} id={variant.id} />
						<label htmlFor={variant.id}>{variant.name}</label>
					</li>
				);
			})}
		</ul>
	);
};
