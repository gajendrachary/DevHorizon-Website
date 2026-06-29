import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Linkedin, Link2, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { SEO, getBreadcrumbSchema } from '@/components/common/SEO';
import { toast } from 'sonner';
import jzThumb from '@/assets/jz-launch-thumbnail.jpg.asset.json';
import jzArticle from '@/assets/jz-launch-article.jpg.asset.json';

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  excerpt: string;
  cover: string;
  articleImage?: string;
  body: { type: 'p' | 'h2' | 'quote' | 'image'; text?: string; src?: string; caption?: string }[];
}

const posts: Record<string, Post> = {
  'jz-group-hotels-launch-bengaluru-2026': {
    slug: 'jz-group-hotels-launch-bengaluru-2026',
    title: 'JZ Group of Hotels — Website & App Launch, Bengaluru (14-02-2026)',
    date: 'Feb 14, 2026',
    readTime: '5 min read',
    author: 'Gajendrachary',
    category: 'Technology',
    excerpt:
      'DevHorizon Technologies powered the digital transformation of JZ Group of Hotels with a state-of-the-art website, mobile app, and billing system — redefining luxury hospitality with future-ready technology.',
    cover: jzThumb.url,
    articleImage: jzArticle.url,
    body: [
      {
        type: 'p',
        text: 'On 14th February 2026, JZ Group of Hotels officially unveiled their brand-new website, mobile application, and integrated billing system at a launch event held in Bengaluru. The platform — designed, developed and deployed end-to-end by DevHorizon Technologies Private Limited — marks a major milestone in the group\'s digital transformation journey.',
      },
      { type: 'h2', text: 'Powering Luxury Hospitality with Future-Ready Technology' },
      {
        type: 'p',
        text: 'The new ecosystem brings together a high-performance booking website, a cross-platform guest mobile app, and a centralised billing & operations dashboard. From real-time room availability and secure online payments to revenue reporting and guest CRM, every layer of the stack is engineered for scale, speed, and reliability.',
      },
      {
        type: 'image',
        src: jzArticle.url,
        caption: 'Coverage from The New Indian Times on the JZ Group Website & App launch event, Bengaluru — 14-02-2026.',
      },
      { type: 'h2', text: 'Driving the Digital Transformation' },
      {
        type: 'quote',
        text: 'The man driving the digital transformation of the JZ Group is software developer Gajendrachary, who is also the Founder & Managing Director of DevHorizon Technologies Private Limited. Their state-of-the-art technology is further improving the guest experience along with streamlining the booking system.',
      },
      {
        type: 'p',
        text: 'The JZ empire has been further strengthened by implementing smart systems and futuristic technologies required to maintain a competitive edge in the digital era. With the synergy of luxurious stay, strong leadership and technology-driven service, JZ Group of Hotels has been successful in creating a new dimension in the global hospitality sector.',
      },
      { type: 'h2', text: 'What DevHorizon Delivered' },
      {
        type: 'p',
        text: '• Responsive marketing & booking website — "Luxury Stays, Timeless Experiences"\n• Native-feel mobile app for guests, bookings and loyalty\n• Centralised billing system with bookings, guests, rooms and reports\n• Real-time revenue dashboard with analytics and growth tracking\n• Scalable cloud architecture — secure, fast, and future-ready',
      },
      {
        type: 'p',
        text: 'At DevHorizon, we are proud to be the trusted technology partner building the backbone of tomorrow\'s hospitality — one launch at a time.',
      },
    ],
  },
};

const BlogPost = () => {
  const { slug = '' } = useParams();
  const post = posts[slug];

  const [copied, setCopied] = useState(false);

  if (!post) return <Navigate to="/blog" replace />;

  const url = `https://www.devhorizontech.com/blog/${post.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Article link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: [post.cover, post.articleImage].filter(Boolean),
    datePublished: '2026-02-14',
    dateModified: '2026-02-14',
    keywords: [
      'Gajendrachary',
      'DevHorizon',
      'DevHorizon Technologies',
      'DevHorizon Technologies Private Limited',
      'JZ Group of Hotels',
      'Bengaluru',
      'Hospitality Technology',
      'Hotel Booking App',
      'Hotel Website Launch',
    ],
    articleSection: 'Technology',
    author: {
      '@type': 'Person',
      name: 'Gajendrachary',
      jobTitle: 'Founder & Managing Director',
      worksFor: { '@type': 'Organization', name: 'DevHorizon Technologies Private Limited' },
      url: 'https://www.devhorizontech.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevHorizon Technologies Private Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.devhorizontech.com/devhub-logo.png',
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: [
      { '@type': 'Person', name: 'Gajendrachary' },
      { '@type': 'Organization', name: 'DevHorizon Technologies Private Limited' },
      { '@type': 'Organization', name: 'JZ Group of Hotels' },
    ],
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.devhorizontech.com/' },
    { name: 'Blog', url: 'https://www.devhorizontech.com/blog' },
    { name: post.title, url },
  ]);

  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <Layout>
      <SEO
        title={`${post.title} | Gajendrachary, DevHorizon Technologies`}
        description={`Gajendrachary, Founder & MD of DevHorizon Technologies, leads the launch of JZ Group of Hotels' new website, mobile app & billing system in Bengaluru (14-Feb-2026). ${post.excerpt}`}
        canonical={url}
        type="article"
        image={post.cover}
        schema={{ '@context': 'https://schema.org', '@graph': [articleSchema, breadcrumbSchema] }}
      />

      <article className="bg-background">
        {/* Hero Image — full, uncropped */}
        <section className="pt-8 md:pt-12">
          <div className="container-swiss">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-card">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Title & meta below the image */}
        <section className="pt-8">
          <div className="container-swiss">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild variant="hero" className="rounded-full">
                  <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> Share on LinkedIn
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full" onClick={handleCopyLink}>
                  {copied ? <><Check className="w-4 h-4 mr-2" /> Copied</> : <><Link2 className="w-4 h-4 mr-2" /> Copy Link</>}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Body */}
        <section className="py-12 md:py-16">
          <div className="container-swiss">
            <div className="max-w-3xl mx-auto space-y-6">
              {post.body.map((block, i) => {
                if (block.type === 'h2') {
                  return (
                    <h2 key={i} className="text-2xl md:text-3xl font-bold mt-6">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-primary pl-4 italic text-muted-foreground bg-secondary/30 py-4 pr-4 rounded-r-lg"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === 'image' && block.src) {
                  return (
                    <figure key={i} className="my-8">
                      <div className="rounded-2xl overflow-hidden border border-border bg-card">
                        <img src={block.src} alt={block.caption || post.title} className="w-full h-auto" loading="lazy" />
                      </div>
                      {block.caption && (
                        <figcaption className="text-xs text-muted-foreground text-center mt-3">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                return (
                  <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                    {block.text}
                  </p>
                );
              })}

              <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" /> All Articles
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" /> Share on LinkedIn
                    </a>
                  </Button>
                  <Button variant="ghost" className="rounded-full" onClick={handleCopyLink}>
                    {copied ? <><Check className="w-4 h-4 mr-2" /> Copied</> : <><Link2 className="w-4 h-4 mr-2" /> Copy Link</>}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
