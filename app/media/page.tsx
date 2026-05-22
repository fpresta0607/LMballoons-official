import { getCollection } from "@/lib/media";
import { MediaGallery } from "./media-gallery";

export const revalidate = 3600;

export default async function MediaPage() {
  const items = await getCollection("gallery");
  return <MediaGallery items={items} />;
}
