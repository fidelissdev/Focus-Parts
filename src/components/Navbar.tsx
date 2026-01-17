import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-focus-parts.png';
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  const checkAdminStatus = async (userId: string) => {
    const {
      data
    } = await supabase.from('profiles').select('role').eq('id', userId).single();
    setIsAdmin(data?.role === 'admin');
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Sobre',
    path: '/sobre'
  }, {
    name: 'Produtos',
    path: '/produtos'
  }, {
    name: 'Contato',
    path: '/contato'
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.img alt="Focus Parts" className="h-12 md:h-16" whileHover={{
          scale: 1.05
        }} src="/lovable-uploads/1d45002b-d0c2-4bb1-9e3e-9afac94a63fa.png" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? 'text-foreground' : ''}`}>
              {link.name}
            </Link>)}
          
          {user ? <div className="flex items-center gap-4">
              {isAdmin && <Link to="/admin">
                  <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Settings size={16} />
                    Admin
                  </Button>
                </Link>}
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut size={16} />
                Sair
              </Button>
            </div> : <Link to="/auth">
              <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <User size={16} />
                Entrar
              </Button>
            </Link>}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} className="nav-link py-2" onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>)}
              
              {user ? <>
                  {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full gap-2 border-primary">
                        <Settings size={16} />
                        Painel Admin
                      </Button>
                    </Link>}
                  <Button variant="ghost" onClick={() => {
              handleLogout();
              setIsOpen(false);
            }} className="w-full gap-2">
                    <LogOut size={16} />
                    Sair
                  </Button>
                </> : <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 border-primary">
                    <User size={16} />
                    Entrar
                  </Button>
                </Link>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
};