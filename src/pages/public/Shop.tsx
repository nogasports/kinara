import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Product } from '../../types/product';
import { ShoppingCart, Filter, Search } from 'lucide-react';
import ShopSummary from '../../components/shop/ShopSummary';
import ProductView from '../../components/ProductView';
import Checkout from '../../components/Checkout';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [summaryStats, setSummaryStats] = useState({
    availableProducts: 0,
    availableChange: 0,
    newArrivals: 0,
    newArrivalsChange: 0,
    onSale: 0,
    onSaleChange: 0,
    shipping: 3,
    shippingChange: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);

        // Calculate shop stats
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        const availableProducts = productsData.filter(p => p.stock > 0).length;
        const newArrivals = productsData.filter(p => 
          new Date(p.createdAt.seconds * 1000) > thirtyDaysAgo
        ).length;

        setSummaryStats({
          availableProducts,
          availableChange: Math.floor(Math.random() * 20) - 10,
          newArrivals,
          newArrivalsChange: Math.floor(Math.random() * 20) - 10,
          onSale: Math.floor(availableProducts * 0.2), // Example: 20% of products on sale
          onSaleChange: Math.floor(Math.random() * 20) - 10,
          shipping: 3,
          shippingChange: -10 // Example: 10% faster than last month
        });

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-6">Shop</h1>
          <p className="text-xl max-w-2xl">
            Browse our collection of solar energy products.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-20">
        <div className="container">
          {/* Shop Summary */}
          <ShopSummary stats={summaryStats} />

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-[2deg] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-[2deg] px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-[2deg] overflow-hidden shadow-md group">
                <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img 
                    src={product.images[0].data}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      KES {product.price.toLocaleString()}
                    </span>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <div className="container flex items-center justify-between">
            <div>
              <p className="text-gray-600">Cart Total ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
              <p className="text-2xl font-bold">KES {cartTotal.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="btn btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Product View Modal */}
      {selectedProduct && (
        <ProductView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            addToCart(selectedProduct.id);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          cart={cart.map(item => {
            const product = products.find(p => p.id === item.productId)!;
            return {
              ...item,
              price: product.price,
              productName: product.name,
              productImage: product.images[0].data
            };
          })}
          total={cartTotal}
          onClose={() => setShowCheckout(false)}
          onComplete={() => {
            setCart([]);
            setShowCheckout(false);
          }}
        />
      )}
    </div>
  );
}