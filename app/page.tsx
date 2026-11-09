import Categories from "@/components/Home/Categories/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/Home/Hero/Hero";
import { PromoBanner } from "@/components/Home/PromoBanner/PromoBanner";
import { SubscriptionForm } from "@/components/Home/SubscriptionForm/SubscriptionForm";

export default async function Home() {

  return (
    <main className="space-y-4  bg-white">
      <Hero />
      <Categories />
      <PromoBanner />
      <FeaturedProducts />
      <SubscriptionForm />
    </main>
  );
}
