import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import logo from '@/assets/logo-focus-parts.png';
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img alt="Focus Parts" className="h-12" src="/lovable-uploads/51da95ab-8c5c-415e-95d5-dfeaf1a99938.png" />
            <p className="text-muted-foreground text-sm">
              Especialistas em autopeças de qualidade. Iluminação, lanternas e acessórios 
              para veículos leves e pesados.
            </p>
            <div className="flex gap-4">
              <motion.a href="#" whileHover={{
              scale: 1.1,
              y: -2
            }} className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{
              scale: 1.1,
              y: -2
            }} className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{
              scale: 1.1,
              y: -2
            }} className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">Links Rápidos</h4>
            <ul className="space-y-2">
              {[{
              name: 'Home',
              path: '/'
            }, {
              name: 'Sobre Nós',
              path: '/sobre'
            }, {
              name: 'Produtos',
              path: '/produtos'
            }, {
              name: 'Contato',
              path: '/contato'
            }].map(link => <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">Categorias</h4>
            <ul className="space-y-2">
              {['Lanternas', 'Faróis', 'Linha Pesada', 'Acessórios'].map(category => <li key={category}>
                  <Link to="/produtos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {category}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-primary" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary" />
                contato@focusparts.com.br
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-primary mt-1" />
                São Paulo, SP - Brasil
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Focus Parts. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};