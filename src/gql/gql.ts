/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddItem($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.CartAddItemDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "fragment Cart on Order {\n  id\n}": types.CartFragmentDoc,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "query CollectionsGetByCategorySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.CollectionsGetByCategorySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  variants {\n    ...ProductListItemVariants\n  }\n}": types.ProductListItemFragmentDoc,
    "fragment ProductListItemVariants on ProductVariants {\n  ... on ProductColorVariant {\n    id\n    name\n    stage\n    color\n  }\n  ... on ProductSizeColorVariant {\n    id\n    name\n    stage\n    color\n    size\n  }\n  ... on ProductSizeVariant {\n    id\n    name\n    stage\n    size\n  }\n}": types.ProductListItemVariantsFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetBySlug($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetBySlugDocument,
    "query ProductsGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListDocument,
    "query RelatedProductsGetList($categorySlug: String!) {\n  products(where: {categories_some: {slug: $categorySlug}}) {\n    ...ProductListItem\n  }\n}": types.RelatedProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItem($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetByCategorySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    products {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  variants {\n    ...ProductListItemVariants\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemVariants on ProductVariants {\n  ... on ProductColorVariant {\n    id\n    name\n    stage\n    color\n  }\n  ... on ProductSizeColorVariant {\n    id\n    name\n    stage\n    color\n    size\n  }\n  ... on ProductSizeVariant {\n    id\n    name\n    stage\n    size\n  }\n}"): typeof import('./graphql').ProductListItemVariantsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetBySlug($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RelatedProductsGetList($categorySlug: String!) {\n  products(where: {categories_some: {slug: $categorySlug}}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').RelatedProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
