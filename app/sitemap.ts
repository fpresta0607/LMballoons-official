export default function sitemap() {
  const baseUrl = "https://lmdesignsandco.com";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/media`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
}
