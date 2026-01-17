import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  code: string | null;
  image_url: string | null;
  category_id: string | null;
  categories?: { name: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Produtos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('categoria')
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (name, slug)
      `)
      .eq('active', true)
      .order('name');

    if (selectedCategory) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', selectedCategory)
        .single();
      if (cat) {
        query = query.eq('category_id', cat.id);
      }
    }

    const { data } = await query;
    if (data) setProducts(data);
    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ categoria: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-12 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">
              Nossos <span className="text-primary">Produtos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore nossa linha completa de peças automotivas de alta qualidade
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-16 bg-background z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(null)}
                className={selectedCategory === null ? 'bg-primary' : ''}
              >
                Todos
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={selectedCategory === cat.slug ? 'bg-primary' : ''}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2"
              onClick={() => setShowFilters(true)}
            >
              <Filter size={18} />
              Filtrar
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrar por categoria</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => {
                handleCategoryChange(null);
                setShowFilters(false);
              }}
              className={selectedCategory === null ? 'bg-primary' : ''}
            >
              Todos
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                onClick={() => {
                  handleCategoryChange(cat.slug);
                  setShowFilters(false);
                }}
                className={selectedCategory === cat.slug ? 'bg-primary' : ''}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    code={product.code || undefined}
                    image_url={product.image_url || undefined}
                    category={product.categories?.name}
                    onClick={() => setSelectedProduct(product)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                {selectedProduct.image_url ? (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sem imagem
                  </div>
                )}
              </div>
              <div>
                {selectedProduct.categories?.name && (
                  <span className="text-xs text-primary uppercase tracking-wider font-medium">
                    {selectedProduct.categories.name}
                  </span>
                )}
                <h2 className="text-2xl font-bold mt-2 mb-4">{selectedProduct.name}</h2>
                {selectedProduct.code && (
                  <p className="text-muted-foreground mb-4">
                    Código: <span className="text-foreground">{selectedProduct.code}</span>
                  </p>
                )}
                {selectedProduct.description && (
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                )}
                <div className="mt-6">
                  <Button className="w-full btn-primary-gradient h-12 rounded-none">
                    Solicitar Orçamento
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Produtos;
