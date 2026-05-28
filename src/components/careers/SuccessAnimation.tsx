import { motion } from 'framer-motion';

export const SuccessAnimation = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="rounded-xl border border-border bg-card p-10 text-center shadow-medium"
  >
    <div className="relative mx-auto h-28 w-28 mb-6">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-emerald-500/40"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="relative h-28 w-28 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <motion.path
            d="M14 28 L24 38 L42 18"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
    </div>
    <h3 className="text-2xl font-bold mb-3">Thank you for submitting your application.</h3>
    <p className="text-muted-foreground max-w-md mx-auto mb-6">
      We've received your application and our team will review it shortly. We'll revert back to you
      soon over email.
    </p>
    <button
      onClick={onClose}
      className="text-sm font-medium text-primary hover:underline"
    >
      Submit another application
    </button>
  </motion.div>
);
