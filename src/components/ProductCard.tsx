import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  code?: string;
  image_url?: string;
  category?: string;
  onClick?: () => void;
}

export const ProductCard = ({ name, code, image_url, category, onClick }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card-product group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Sem imagem</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
          >
            <Eye className="text-primary-foreground" size={24} />
          </motion.div>
        </div>
      </div>

      <div className="p-4">
        {category && (
          <span className="text-xs text-primary uppercase tracking-wider font-medium">
            {category}
          </span>
        )}
        <h3 className="font-display text-lg mt-1 line-clamp-2">{name}</h3>
        {code && (
          <p className="text-muted-foreground text-sm mt-1">Código: {code}</p>
        )}
      </div>
    </motion.div>
  );
};
