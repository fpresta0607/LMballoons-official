import { blogPosts } from "@/lib/blog";
import type { MediaItem, MediaType } from "@/lib/media-types";

/**
 * The site's original hard-coded images. Used as (a) the seed source that
 * populates Supabase on first setup and (b) the runtime fallback when Supabase
 * is not yet configured, so the public site renders identically before wiring.
 *
 * `src` values are paths under /public. The seed script reads each file from
 * disk, uploads it to Supabase Storage, and records the resulting public URL.
 */

function def(
  section: string,
  index: number,
  src: string,
  alt: string,
  title: string,
  type: MediaType = "image"
): MediaItem {
  return { id: `default:${section}:${index}`, src, alt, title, type, storagePath: null };
}

const gallery: MediaItem[] = [
  ["/images/generated/HappilyEverAfterArch.jpg", "White and gold 'Happily Ever After' balloon arch with neon sign", "Happily Ever After"],
  ["/images/generated/BalloonGarlandBackdrop.png", "Balloon garland backdrop", "Garland Backdrop"],
  ["/images/generated/LedCenterpiece2.png", "LED centerpiece design", "LED Centerpiece"],
  ["/images/generated/BirthdayPartyArch.png", "Birthday party arch", "Birthday Arch"],
  ["/images/generated/LEDcenterpiece3.png", "LED centerpiece", "Glowing Arrangement"],
  ["/images/generated/StPatricksGarland.png", "St. Patrick's Day garland", "St. Patrick’s Garland"],
  ["/images/generated/ValentinesCenterpiece.png", "Valentine's centerpiece", "Valentine’s Centerpiece"],
  ["/images/generated/LEDCenterpiece_Home.png", "LED centerpiece event display", "Event Display"],
  ["/images/generated/ValentinesPillar.png", "Valentine's pillar display", "Valentine’s Pillar"],
  ["/images/generated/StPatricksLobby.png", "St. Patrick's Day lobby display", "Lobby Installation"],
  ["/images/generated/BirthdayBalloon.jpg", "Birthday balloon design", "Birthday Celebration"],
  ["/images/generated/CenterpieceCheetah.jpeg", "Cheetah print centerpiece", "Cheetah Centerpiece"],
  ["/images/generated/CenterpieceCheetah2.jpeg", "Cheetah print centerpiece arrangement", "Cheetah Arrangement"],
  ["/images/generated/BasketballDisplay1.jpg", "Basketball themed balloon display", "Basketball Display"],
  ["/images/generated/BasketballDisplay2.jpg", "Basketball themed balloon centerpiece", "Basketball Centerpiece"],
  ["/images/generated/BasketballDisplay3.jpg", "Basketball themed balloon columns", "Basketball Columns"],
  ["/images/generated/BalletBirthdayTower.jpg", "Pink ballerina themed 2nd birthday balloon tower", "Ballerina Birthday"],
  ["/images/generated/IlliniWindowColumn.jpg", "Orange and navy Illini balloon column by a Chicago skyline window", "Illini Skyline Column"],
].map(([src, alt, title], i) => def("gallery", i, src, alt, title, "image"));

const galleryVideos: MediaItem[] = [
  ["/videos/BackdropVideo.mov", "Balloon backdrop installation", "Backdrop Installation"],
  ["/videos/LEDVideo.mov", "LED balloon centerpiece display", "LED Display"],
  ["/videos/StPatricksVideo.mov", "St. Patrick's Day balloon installation", "St. Patrick’s Installation"],
].map(([src, alt, title], i) => def("gallery", gallery.length + i, src, alt, title, "video"));

const homeFeatured: MediaItem[] = [
  ["/images/generated/BalloonGarlandBackdrop.png", "Custom balloon garland backdrop for events in Chicagoland"],
  ["/images/generated/BirthdayPartyArch.png", "Birthday party balloon arch by LM Designs"],
  ["/images/generated/LEDcenterpiece3.png", "LED balloon centerpiece display"],
  ["/images/generated/LedCenterpiece2.png", "Glowing LED balloon centerpiece design"],
  ["/images/generated/StPatricksGarland.png", "St. Patrick's Day balloon garland display"],
  ["/images/generated/HappilyEverAfterArch.jpg", "White and gold 'Happily Ever After' balloon arch with neon sign for weddings"],
].map(([src, alt], i) => def("home-featured", i, src, alt, ""));

export const DEFAULT_MEDIA: Record<string, MediaItem[]> = {
  gallery: [...gallery, ...galleryVideos],
  "home-featured": homeFeatured,
  "home-hero": [
    def("home-hero", 0, "/images/generated/LEDCenterpiece_Home.png", "Elegant LED balloon centerpieces at a dinner table", ""),
  ],
  "about-founders": [
    def("about-founders", 0, "/images/generated/duo.jpeg", "Lindsey and Marina, founders of LM Designs & Balloons Co.", ""),
  ],
  "about-process": [
    def("about-process", 0, "/images/generated/BalloonGarlandBackdrop.png", "Balloon garland backdrop at an event", ""),
  ],
  "brand-logo": [
    def("brand-logo", 0, "/images/logo.png", "LM Designs & Balloons Co.", ""),
  ],
  ...Object.fromEntries(
    blogPosts.map((post) => [
      `blog:${post.slug}`,
      [def(`blog:${post.slug}`, 0, post.image, post.imageAlt, post.title)],
    ])
  ),
};
