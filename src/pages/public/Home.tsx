import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Product } from '../../types/product';
import { Sun, Battery, Lightbulb, Leaf, Shield, DollarSign, Award, Users, BarChart3, Globe, Heart, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('stock', '>', 0),
          limit(4)
        );
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setFeaturedProducts(productsData);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="flex items-center gap-4 mb-6">
            <Sun className="h-12 w-12 text-primary-400" />
            <h1 className="text-5xl font-bold">
              Illuminating Lives with Solar Innovation
            </h1>
          </div>
          <p className="text-xl mb-8 max-w-2xl">
            Empowering communities with sustainable, reliable, and affordable solar energy solutions. Join us in creating a cleaner, greener future.
          </p>
          <div className="flex gap-4">
            <Link to="/solutions" className="btn btn-primary">
              Explore Solutions
            </Link>
            <Link to="/shop" className="btn btn-outline border-white text-white hover:bg-white/10">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Kinara Energy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-[2deg] bg-primary-50 flex flex-col items-center text-center">
              <Leaf className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                100% solar-powered solutions reducing reliance on fossil fuels and minimizing environmental impact.
              </p>
            </div>
            <div className="p-6 rounded-[2deg] bg-primary-50 flex flex-col items-center text-center">
              <DollarSign className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Affordability</h3>
              <p className="text-gray-600">
                Cost-effective solutions making clean energy accessible to all communities.
              </p>
            </div>
            <div className="p-6 rounded-[2deg] bg-primary-50 flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Durability</h3>
              <p className="text-gray-600">
                Built to withstand harsh conditions with minimal maintenance requirements.
              </p>
            </div>
            <div className="p-6 rounded-[2deg] bg-primary-50 flex flex-col items-center text-center">
              <Zap className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                Leveraging cutting-edge solar technology for efficient, user-friendly solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-600 mt-2">Discover our most popular solar solutions</p>
            </div>
            <Link 
              to="/shop" 
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[2deg] overflow-hidden shadow-md animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[2deg] overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
                  <Link to={`/shop?product=${product.id}`} className="block">
                    <div className="aspect-square overflow-hidden">
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
                        <span className="text-primary-600 group-hover:translate-x-2 transition-transform duration-300">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-12 text-gray-500">
                No featured products available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-primary-50 p-8 rounded-[2deg] text-center">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">10,000+</h3>
              <p className="text-gray-600">Households Powered</p>
            </div>
            <div className="bg-primary-50 p-8 rounded-[2deg] text-center">
              <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">50,000+</h3>
              <p className="text-gray-600">Tons of CO₂ Reduced</p>
            </div>
            <div className="bg-primary-50 p-8 rounded-[2deg] text-center">
              <Heart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">100+</h3>
              <p className="text-gray-600">Communities Served</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-primary-50 p-8 rounded-[2deg]">
              <Award className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-6">Mission</h3>
              <p className="text-gray-600 mb-4">
                To democratize access to clean energy by providing innovative, affordable, and sustainable solar solutions that empower individuals, communities, and businesses to thrive.
              </p>
              <Link to="/about" className="btn btn-primary">Learn More</Link>
            </div>
            <div className="bg-primary-50 p-8 rounded-[2deg]">
              <BarChart3 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-6">Vision</h3>
              <p className="text-gray-600 mb-4">
                A world where clean, renewable energy is accessible to all, driving economic growth, environmental preservation, and social equity.
              </p>
              <Link to="/about" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Switch to Solar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy with Kinara Energy.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/solutions" className="btn bg-white text-primary-600 hover:bg-gray-100">
              View Solutions
            </Link>
            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}