import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ProductCard } from '../components/ProductCard';
import { ProductDetail } from '../components/ProductDetail';
import { Cart } from '../components/Cart';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Checkout } from '../components/Checkout';
import { Profile } from '../components/Profile';
import { Settings } from '../components/Settings';
import { History } from '../components/History';
import { LogoutModal } from '../components/LogoutModal';
import { Product, Category } from '../types';
// Keep a fallback list locally for development if API is unavailable
import { products as fallbackProducts } from '../data/products';
import { useCart } from '../hooks/useCart';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts);
  const [categoriesList, setCategoriesList] = useState<Category[]>(() => {
    const cats: Record<string, number> = {};
    fallbackProducts.forEach(p => cats[p.category] = (cats[p.category] || 0) + 1);
    return Object.keys(cats).map(key => ({ id: key, name: key.toUpperCase(), count: cats[key] }));
  });

  const filteredProducts = productsList.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (quantity: number, size?: string) => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity, size);
      setSelectedProduct(null);
    }
  };

  // Fetch products from backend whenever the page mounts
  useEffect(() => {
    const load = async () => {
      try {
        const { fetchJson } = await import('../utils/api');
        const data = await fetchJson('/productos.php');
        // Map DB fields to Product type
        const mapped: Product[] = data.map((p: any) => ({
          id: p.id_producto,
          name: p.nombre_producto,
          price: parseFloat(p.precio) || 0,
          image: p.image || '',
          description: p.categoria || p.franquicia || '',
          category: p.categoria || 'otros',
          sizes: []
        }));
        setProductsList(mapped);

        // compute categories
        const cats: Record<string, number> = {};
        mapped.forEach(prod => cats[prod.category] = (cats[prod.category] || 0) + 1);
        const categoriesArr = Object.keys(cats).map(key => ({ id: key, name: key.toUpperCase(), count: cats[key] }));
        setCategoriesList(categoriesArr);
      } catch (e) {
        console.error('Could not load products from API, using fallback', e);
      }
    };
    load();
  }, []);

  const DEFAULT_CLIENT_ID = 'CLI-001';
  const [auth, setAuth] = useState<{ clientId?: string; name?: string }>(() => ({
    clientId: localStorage.getItem('clientId') || undefined,
    name: localStorage.getItem('clientName') || undefined,
  }));

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Handle logout logic here
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientName');
    setAuth({});
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-[#001937]">
      <Header
        onSearch={setSearchQuery}
        cartItemCount={itemCount}
        onCartClick={() => setShowCart(true)}
        onMenuClick={() => setSidebarOpen(true)}
        onLoginClick={() => setShowLogin(true)}
        userName={auth.name}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="flex">
        <Sidebar
          categories={categoriesList}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onProfileClick={() => {
            setShowProfile(true);
            setSidebarOpen(false);
          }}
          onSettingsClick={() => {
            setShowSettings(true);
            setSidebarOpen(false);
          }}
          onHistoryClick={() => {
            setShowHistory(true);
            setSidebarOpen(false);
          }}
          onLogoutClick={() => {
            setShowLogoutModal(true);
            setSidebarOpen(false);
          }}
        />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-black text-[#ff5d23] mb-8">
              {selectedCategory
                ? categoriesList.find(c => c.id === selectedCategory)?.name
                : 'TODOS LOS PRODUCTOS'}
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No se encontraron productos
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCart && (
        <Cart
          items={cart}
          total={total}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSuccess={(id, name) => {
            setAuth({ clientId: id, name });
            setShowLogin(false);
          }}
          onOpenRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSuccess={() => setShowRegister(false)}
          onOpenLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showCheckout && (
        <Checkout
          cartItems={cart}
          total={total}
          clientId={auth.clientId || DEFAULT_CLIENT_ID}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            // Could add success message or clear cart here
          }}
        />
      )}

      {showProfile && (
        <Profile onClose={() => setShowProfile(false)} clientId={auth.clientId || DEFAULT_CLIENT_ID} />
      )}

      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}

      {showHistory && (
        <History onClose={() => setShowHistory(false)} clientId={auth.clientId || DEFAULT_CLIENT_ID} />
      )}

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}
