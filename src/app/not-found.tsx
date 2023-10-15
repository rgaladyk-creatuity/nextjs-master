import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<h2>Not Found 1</h2>
			<p>PAGE not found xxx.</p>
			<p>
				<Link href="/">Go back</Link>
			</p>
		</div>
	);
}
