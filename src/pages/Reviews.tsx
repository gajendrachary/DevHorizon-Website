import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Layout } from "@/components/layout/Layout";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SEO, getAggregateRatingSchema, getBreadcrumbSchema } from "@/components/common/SEO";

const ANIMATION_CONFIG = {
  entrance: { duration: 0.8, stagger: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  hover: { scale: 1.02, rotateY: 5, rotateX: -3, shadowIntensity: "0 25px 50px -12px" },
  tap: { scale: 0.98, rotateY: 3, rotateX: -2 },
};

const reviews = [
  {
    name: "Rajesh Kumar",
    company: "Jaggery Tea Point",
    rating: 5,
    review:
      "DevHub transformed our tea shop's online presence completely. The website they built captures our brand essence perfectly, and we've seen a significant increase in online orders since launch.",
    emoji: "☕",
  },
  {
    name: "Priya Sharma",
    company: "Likitha Handcrafts",
    rating: 5,
    review:
      "Working with DevHub was an absolute pleasure. They understood our handcraft business and created a beautiful e-commerce platform that our customers love. The payment integration works flawlessly.",
    emoji: "🎨",
  },
  {
    name: "Mohammed Ali",
    company: "BLR360",
    rating: 5,
    review:
      "The mobile app DevHub Technologies developed for our taxi service is exceptional. Real-time tracking, seamless payments, and great user experience. Our booking rates have increased by 40% since launch.",
    emoji: "🚕",
  },
  {
    name: "Anitha Reddy",
    company: "Haven Salad",
    rating: 5,
    review:
      "DevHub delivered beyond our expectations. The subscription system they built for our healthy food delivery service works perfectly. Their ongoing support has been invaluable.",
    emoji: "🥗",
  },
  {
    name: "Venkat Rao",
    company: "Sri Kenchamba Ceramics",
    rating: 5,
    review:
      "Professional, responsive, and technically excellent. DevHub created a comprehensive product catalog website that has helped us reach customers across South India. Highly recommended!",
    emoji: "🏺",
  },
  {
    name: "Sarah Mitchell",
    company: "TechStart UAE",
    rating: 5,
    review:
      "As an international client, I was impressed by DevHub's communication and professionalism. They delivered our web application on time and within budget. Great experience working with them.",
    emoji: "🌍",
  },
];

const stats = [
  { value: "20+", label: "Projects Completed", emoji: "🚀" },
  { value: "95%", label: "Client Satisfaction", emoji: "⭐" },
  { value: "24/7", label: "Support Available", emoji: "💬" },
];

const Reviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<number[]>(reviews.map(() => 0));
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isTouching = useRef(false);

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: carouselRef, inView: carouselInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll("[data-review-card]");
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0,
      closestDistance = Infinity;
    const newOffsets: number[] = [];
    cards.forEach((card, index) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = cardCenter - containerCenter;
      newOffsets[index] = Math.max(-1, Math.min(1, distance / (container.clientWidth / 2)));
      if (Math.abs(distance) < closestDistance) {
        closestDistance = Math.abs(distance);
        closestIndex = index;
      }
    });
    setCardOffsets(newOffsets);
    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll("[data-review-card]");
    const card = cards[index] as HTMLElement;
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }, []);

  const scrollPrev = () => scrollToCard(Math.max(0, activeIndex - 1));
  const scrollNext = () => scrollToCard(Math.min(reviews.length - 1, activeIndex + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isTouching.current = true;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTouching.current) touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!isTouching.current) return;
    isTouching.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? scrollNext() : scrollPrev();
    }
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client Reviews",
    ...getAggregateRatingSchema(),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.review,
    })),
  };
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://devhubtechnologies.in/" },
    { name: "Reviews", url: "https://devhubtechnologies.in/reviews" },
  ]);

  return (
    <Layout>
      <SEO
        title="Client Testimonials & Reviews | DevHub Technologies - 95% Client Satisfaction"
        description="Read what our clients say about DevHub Technologies. With 95% client satisfaction and 40+ successful projects delivered, see why businesses choose us for web and mobile development."
        schema={{ "@context": "https://schema.org", "@graph": [reviewSchema, breadcrumbSchema] }}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about their experience working with
              DevHub.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section ref={carouselRef} className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        <div className="container-swiss relative z-10">
          <div className="relative">
            <motion.button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <div
              ref={scrollContainerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 touch-pan-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex-shrink-0 w-[calc(50vw-42.5vw)] sm:w-[calc(50vw-180px)] md:w-[calc(50vw-200px)]" />
              {reviews.map((review, index) => (
                <div key={review.name} data-review-card>
                  <ReviewCard
                    review={review}
                    index={index}
                    isInView={carouselInView}
                    parallaxOffset={cardOffsets[index] || 0}
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-[calc(50vw-42.5vw)] sm:w-[calc(50vw-180px)] md:w-[calc(50vw-200px)]" />
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                />
              ))}
            </div>
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
                <motion.span
                  className="text-4xl block mb-2"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.emoji}
                </motion.span>
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

const ReviewCard = ({
  review,
  index,
  isInView,
  parallaxOffset,
}: {
  review: (typeof reviews)[0];
  index: number;
  isInView: boolean;
  parallaxOffset: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const parallaxRotateY = parallaxOffset * 8,
    parallaxScale = 1 - Math.abs(parallaxOffset) * 0.05;

  return (
    <motion.div
      className="flex-shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] snap-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative bg-card border border-border p-8 rounded-2xl overflow-hidden h-full"
        style={{ transformStyle: "preserve-3d" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotateY: isHovered ? 5 : parallaxRotateY,
          scale: isHovered ? 1.02 : parallaxScale,
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? "0 25px 50px -12px hsl(var(--primary) / 0.25)"
            : "0 4px 6px -1px hsl(var(--foreground) / 0.1)",
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        <div className="absolute top-6 right-6 text-muted-foreground/20">
          <Quote className="w-10 h-10" />
        </div>
        <motion.div
          className="absolute top-4 left-4 text-3xl"
          animate={{ y: isHovered ? [-2, 2, -2] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {review.emoji}
        </motion.div>
        <div className="flex gap-1 mb-4 mt-8">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">"{review.review}"</p>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center text-lg font-bold rounded-full">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold">{review.name}</div>
            <div className="text-sm text-muted-foreground">{review.company}</div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Reviews;
