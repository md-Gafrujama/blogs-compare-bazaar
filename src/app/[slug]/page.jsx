import { notFound } from 'next/navigation';
import Blog1 from '@/components/Blog1';
import Blog2 from '@/components/Blog2';
import Blog3 from '@/components/Blog3';

// Map slugs to blog components
const blogComponents = {
  'buyers-content-help': Blog1,
  'buyer-journey': Blog2,
  'AI-in-HR-Payroll': Blog3,
};

export default async function BlogPost({ params }) {
  params = await params;

  if (!params || !params.slug) return notFound();

  const BlogComponent = blogComponents[params.slug];

  if (!BlogComponent) return notFound();

  return <BlogComponent />;
}