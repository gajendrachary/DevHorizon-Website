import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Technology', 'Mobile', 'Marketing', 'Design'];

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2025',
    excerpt: 'Explore the cutting-edge technologies and trends shaping the future of web development, from AI integration to advanced frameworks.',
    category: 'Technology',
    date: 'Dec 15, 2025',
    readTime: '8 min read',
    author: 'Gajendrachary',
    featured: true,
    slug: 'future-of-web-development-2025'
  },
  {
    id: 2,
    title: 'React vs Vue: Which Framework to Choose in 2025?',
    excerpt: 'A comprehensive comparison of React and Vue.js to help you make an informed decision for your next project.',
    category: 'Technology',
    date: 'Dec 12, 2025',
    readTime: '10 min read',
    author: 'Gajendrachary',
    featured: false,
    slug: 'react-vs-vue-2025'
  },
  {
    id: 3,
    title: 'Complete Guide to Mobile App Development',
    excerpt: 'Everything you need to know about building successful mobile applications, from concept to deployment.',
    category: 'Mobile',
    date: 'Dec 8, 2025',
    readTime: '12 min read',
    author: 'Pavan Raj',
    featured: false,
    slug: 'mobile-app-development-guide'
  },
  {
    id: 4,
    title: '10 Tips to Maximize Your Meta Ads ROI',
    excerpt: 'Learn proven strategies to optimize your Meta advertising campaigns and get the best return on investment.',
    category: 'Marketing',
    date: 'Dec 5, 2025',
    readTime: '6 min read',
    author: 'Pavan Raj',
    featured: false,
    slug: 'meta-ads-roi-tips'
  },
  {
    id: 5,
    title: 'UI/UX Design Principles for Better Conversions',
    excerpt: 'Discover the design principles that can significantly improve your website conversion rates.',
    category: 'Design',
    date: 'Dec 1, 2025',
    readTime: '7 min read',
    author: 'Gajendrachary',
    featured: false,
    slug: 'ui-ux-design-principles'
  },
  {
    id: 6,
    title: 'Building Scalable Applications with Node.js',
    excerpt: 'A deep dive into building performant and scalable backend applications using Node.js and modern practices.',
    category: 'Technology',
    date: 'Nov 28, 2025',
    readTime: '9 min read',
    author: 'Gajendrachary',
    featured: false,
    slug: 'scalable-nodejs-applications'
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              DevHub Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insights & Updates
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay updated with the latest trends in technology, mobile development, 
              digital marketing, and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-background">
          <div className="container-swiss">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-border bg-card overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-primary/10 h-64 lg:h-auto flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/30">Featured</span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="w-fit">
                    <Link to={`/blog/${featuredPost.slug}`} className="flex items-center gap-2">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-swiss">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(p => !p.featured).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-secondary/30">
        <div className="container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            <form className="flex gap-4 flex-col sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit" variant="hero">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group border border-border bg-card overflow-hidden card-hover"
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="bg-secondary/50 h-40 flex items-center justify-center">
          <span className="text-4xl font-bold text-muted-foreground/30">{post.title.charAt(0)}</span>
        </div>
        <div className="p-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
            {post.category}
          </span>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default Blog;
