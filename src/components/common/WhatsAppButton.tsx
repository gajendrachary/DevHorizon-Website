import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton = () => {
  const phoneNumber = '918688097373';
  const message = 'Hi DevHub Technologies! I would like to discuss a project.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring effect */}
      <motion.span
        className="absolute inset-0 bg-[#25D366] rounded-full"
        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-0 bg-[#25D366] rounded-full"
        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      />
      
      {/* Icon with bounce */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle className="w-7 h-7 relative z-10" fill="white" />
      </motion.div>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 px-3 py-2 bg-foreground text-background text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      >
        Chat with us
      </motion.span>
    </motion.a>
  );
};
