import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import categoryLanternas from '@/assets/category-lanternas.jpg';
import categoryFarois from '@/assets/category-farois.jpg';
import categoryPesada from '@/assets/category-pesada.jpg';
import categoryAcessorios from '@/assets/category-acessorios.jpg';

const categories = [
  {
    name: 'Lanternas',
    description: 'Iluminação traseira de alta qualidade',
    image: categoryLanternas,
    slug: 'lanternas',
  },
  {
    name: 'Faróis',
    description: 'Sistemas de iluminação frontal',
    image: categoryFarois,
    slug: 'farois',
  },
  {
    name: 'Linha Pesada',
    description: 'Peças para ônibus e caminhões',
    image: categoryPesada,
    slug: 'linha-pesada',
  },
  {
    name: 'Acessórios',
    description: 'Complementos para seu veículo',
    image: categoryAcessorios,
    slug: 'acessorios',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const CategoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossas <span className="text-primary">Linhas</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
              className="card-category group"
            >
              <Link to={`/produtos?categoria=${category.slug}`} className="block relative">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver Produtos
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
