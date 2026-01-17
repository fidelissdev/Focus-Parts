import { motion } from 'framer-motion';
import { Shield, Award, Truck, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Produtos com garantia de fábrica e certificação de qualidade.',
  },
  {
    icon: Award,
    title: 'Marcas Premium',
    description: 'Trabalhamos apenas com as melhores marcas do mercado.',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Envio para todo Brasil com agilidade e segurança.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Especializado',
    description: 'Equipe técnica pronta para ajudar na escolha ideal.',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por que <span className="text-primary">Escolher</span> a Focus Parts?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors duration-300"
              >
                <feature.icon className="text-primary" size={32} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
