import { FormField } from "@/components/atoms/FormField";

export const AddProductReview = () => {
	const fields = ["headline", "content", "rating", "name", "email"];

	return (
		<form data-testid="add-review-form">
			{fields.map((field) => {
				return <FormField name={field} />;
			})}
			<input type="submit" value="Add review" />
		</form>
	);
};
