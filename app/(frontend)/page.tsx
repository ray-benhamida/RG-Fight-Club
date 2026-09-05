import type { Metadata } from "next";
import HeaderContainer from "@/components/HeaderContainer";
import Hero from "@/components/Hero";
import Presentation from "@/components/Presentation";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
};

export default function Home() {
	return (
		<main className="page-layout min-w-0 max-w-full overflow-x-hidden">
			<HeaderContainer />
			<Hero />
			<Presentation />
			<Projects />
			<Gallery />
			<Testimonials />
			<Footer />
		</main>
	);
}
