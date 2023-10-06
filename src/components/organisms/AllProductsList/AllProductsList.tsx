import { ProductList } from "../ProductList/ProductList";
import { executeGraphql } from "@/components/utils";
import { ProductsGetListDocument } from "@/gql/graphql";

export const AllProductsList = async () => {
	const { products } = await executeGraphql(ProductsGetListDocument, {});
	return <ProductList products={products} />;
};
