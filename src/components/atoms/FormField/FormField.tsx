export const FormField = ({ name }: { name: string }) => {
	return (
		<>
			<label htmlFor={name}>{name}</label>
			<input id={name} type="text" name={name} value="" />
		</>
	);
};
