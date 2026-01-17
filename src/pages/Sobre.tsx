import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Target, Award, Users, History } from 'lucide-react';
import heroImage from '@/assets/hero-autoparts.jpg';

const stats = [
  { number: '10+', label: 'Anos de Experiência' },
  { number: '5000+', label: 'Produtos' },
  { number: '10000+', label: 'Clientes Atendidos' },
  { number: '50+', label: 'Parceiros' },
];

const values = [
  {
    icon: Target,
    title: 'Missão',
    description: 'Fornecer peças automotivas de alta qualidade, garantindo satisfação e segurança aos nossos clientes.',
  },
  {
    icon: Award,
    title: 'Visão',
    description: 'Ser referência nacional no mercado de autopeças, reconhecida pela excelência e inovação.',
  },
  {
    icon: Users,
    title: 'Valores',
    description: 'Qualidade, transparência, comprometimento e respeito ao cliente em todas as interações.',
  },
];

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Sobre" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sobre a <span className="text-primary">Focus Parts</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sua parceira de confiança em peças automotivas desde 2014
            </p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <History className="text-primary" size={24} />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  Nossa História
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Uma Trajetória de <span className="text-primary">Sucesso</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A Focus Parts nasceu da paixão pelo setor automotivo e da vontade de 
                  oferecer produtos de qualidade superior aos nossos clientes.
                </p>
                <p>
                  Ao longo dos anos, construímos uma reputação sólida baseada em 
                  confiança, qualidade e atendimento excepcional. Nossa equipe 
                  especializada trabalha incansavelmente para garantir que cada 
                  cliente encontre a peça perfeita para seu veículo.
                </p>
                <p>
                  Hoje, somos reconhecidos como uma das principais empresas do 
                  segmento, oferecendo uma linha completa de lanternas, faróis e 
                  acessórios para veículos leves e pesados.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border p-6 rounded-lg text-center hover:border-primary/50 transition-colors"
                >
                  <span className="text-4xl font-bold text-primary">{stat.number}</span>
                  <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Nossos <span className="text-primary">Pilares</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border p-8 rounded-lg text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
