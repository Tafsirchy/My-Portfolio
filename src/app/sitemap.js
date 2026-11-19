import { getAllProjects } from '@/data/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tafsirchy.com';

export default async function sitemap() {
  const projects = getAllProjects();

  const projectUrls = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
