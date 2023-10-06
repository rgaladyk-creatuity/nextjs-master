import { AllProductsList } from "@/components/organisms/AllProductsList/AllProductsList";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p>Home page</p>
			<ul>
				<li>
					<a href="/collections/summer-vibes">Summer Vibes</a>
				</li>
			</ul>
			<AllProductsList />
		</main>
	);
}
