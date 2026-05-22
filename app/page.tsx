import { getCollection, getSlot } from "@/lib/media";
import HomeClient from "./home-client";

export const revalidate = 3600;

export default async function HomePage() {
  const [hero, featured, logo] = await Promise.all([
    getSlot("home-hero"),
    getCollection("home-featured"),
    getSlot("brand-logo"),
  ]);

  return (
    <HomeClient
      heroSrc={hero?.src ?? "/images/generated/LEDCenterpiece_Home.png"}
      heroAlt={hero?.alt ?? "Elegant LED balloon centerpieces at a dinner table"}
      featured={featured.map((item) => ({ src: item.src, alt: item.alt }))}
      logoSrc={logo?.src ?? "/images/logo.png"}
    />
  );
}
