import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layout } from '@/components/layout/Layout';
import { Star, Quote } from 'lucide-react';
import { SEO, getAggregateRatingSchema, getBreadcrumbSchema } from '@/components/common/SEO';

const reviews = [
  {
    name: 'Rajesh Kumar',
    company: 'Jaggery Tea Point',
    rating: 5,
    review: 'DevHub transformed our tea shop\'s online presence completely. The website they built captures our brand essence perfectly, and we\'ve seen a significant increase in online orders since launch.',
  },
  {
    name: 'Priya Sharma',
    company: 'Likitha Handcrafts',
    rating: 5,
    review: 'Working with DevHub was an absolute pleasure. They understood our handcraft business and created a beautiful e-commerce platform that our customers love. The payment integration works flawlessly.',
  },
  {
    name: 'Mohammed Ali',
    company: 'BLR360',
    rating: 5,
    review: 'The mobile app DevHub developed for our taxi service is exceptional. Real-time tracking, seamless payments, and great user experience. Our booking rates have increased by 40% since launch.',
  },
  {
    name: 'Anitha Reddy',
    company: 'Haven Salad',
    rating: 5,
    review: 'DevHub delivered beyond our expectations. The subscription system they built for our healthy food delivery service works perfectly. Their ongoing support has been invaluable.',
  },
  {
    name: 'Venkat Rao',
    company: 'Sri Kenchamba Ceramics',
    rating: 5,
    review: 'Professional, responsive, and technically excellent. DevHub created a comprehensive product catalog website that has helped us reach customers across South India. Highly recommended!',
  },
  {
    name: 'Sarah Mitchell',
    company: 'TechStart UAE',
    rating: 5,
    review: 'As an international client, I was impressed by DevHub\'s communication and professionalism. They delivered our web application on time and within budget. Great experience working with them.',
  },
];

const stats = [
  { value: '40+', label: 'Projects Completed' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '15+', label: 'Team Members' },
];

const Reviews = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Client Reviews',
    ...getAggregateRatingSchema(),
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.review,
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://devhub.tech/' },
    { name: 'Reviews', url: 'https://devhub.tech/reviews' },
  ]);

  return (
    <Layout>
      <SEO
        title="Client Testimonials & Reviews | DevHub - 95% Client Satisfaction"
        description="Read what our clients say about DevHub. With 95% client satisfaction and 40+ successful projects delivered, see why businesses choose us for web and mobile development."
        schema={{ '@context': 'https://schema.org', '@graph': [reviewSchema, breadcrumbSchema] }}
      />
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
              Client Testimonials
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about 
              their experience working with DevHub.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-background">
        <div className="container-swiss">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={review.name} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-swiss">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-card border border-border p-8 card-hover relative"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-muted-foreground/20">
        <Quote className="w-10 h-10" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        "{review.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold">{review.name}</div>
          <div className="text-sm text-muted-foreground">{review.company}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reviews;
