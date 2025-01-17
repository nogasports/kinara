import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs,
  Timestamp,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Product, Category } from '../../types/product';
import { 
  Plus,
  X,
  Upload,
  Package,
  Trash2
} from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';
import ProductsSummary from '../../components/admin/ProductsSummary';

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summaryStats, setSummaryStats] = useState({
    totalProducts: 0,
    totalChange: 0,
    avgPrice: 0,
    priceChange: 0,
    lowStock: 0,
    lowStockChange: 0,
    outOfStock: 0,
    outOfStockChange: 0
  });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    newCategory: '',
    newCategoryDescription: '',
    features: [''],
    specifications: [{ key: '', value: '' }],
    stock: '',
    images: [] as { data: string; type: string }[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const productsSnapshot = await getDocs(productsQuery);
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);

        // Calculate product stats
        const totalProducts = productsData.length;
        const avgPrice = productsData.reduce((sum, p) => sum + p.price, 0) / totalProducts;
        const lowStock = productsData.filter(p => p.stock < 10).length;
        const outOfStock = productsData.filter(p => p.stock === 0).length;

        setSummaryStats({
          totalProducts,
          totalChange: Math.floor(Math.random() * 20) - 10,
          avgPrice,
          priceChange: Math.floor(Math.random() * 20) - 10,
          lowStock,
          lowStockChange: Math.floor(Math.random() * 20) - 10,
          outOfStock,
          outOfStockChange: Math.floor(Math.random() * 20) - 10
        });

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[];
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (formData.images.length === 0) {
        throw new Error('At least one product image is required');
      }

      let categoryId = formData.categoryId;

      // If new category is provided, create it first
      if (formData.newCategory) {
        const newCategoryRef = await addDoc(collection(db, 'categories'), {
          name: formData.newCategory,
          description: formData.newCategoryDescription,
          createdAt: Timestamp.now()
        });
        categoryId = newCategoryRef.id;
      }

      // Create product
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        categoryId,
        images: formData.images,
        features: formData.features.filter(feature => feature),
        specifications: formData.specifications.reduce((acc, { key, value }) => {
          if (key && value) acc[key] = value;
          return acc;
        }, {} as Record<string, string>),
        stock: Number(formData.stock),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'products'), productData);
      
      // Add new product to state
      setProducts(prev => [{
        id: docRef.id,
        ...productData
      } as Product, ...prev]);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        newCategory: '',
        newCategoryDescription: '',
        features: [''],
        specifications: [{ key: '', value: '' }],
        stock: '',
        images: []
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-16">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first product</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-[2deg] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (KES)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-[2deg] object-cover"
                        src={product.images[0]?.data}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {product.price.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {categories.find(c => c.id === product.categoryId)?.name || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      {/* Products Summary */}
      <ProductsSummary stats={summaryStats} />

      {renderContent()}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[2deg] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[2deg]">
                  {error}
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (KES)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <ImageUpload
                      key={index}
                      imagePreview={image.data}
                      onImageAdd={(newImage) => {
                        const newImages = [...formData.images];
                        newImages[index] = newImage;
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                      onImageRemove={() => {
                        const newImages = formData.images.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, images: newImages }));
                      }}
                    />
                  ))}
                  {formData.images.length < 4 && (
                    <ImageUpload
                      onImageAdd={(newImage) => {
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, newImage]
                        }));
                      }}
                      onImageRemove={() => {}}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Add up to 4 product images. First image will be the main product image.
                </p>
              </div>

              {/* Category */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Category</h3>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Select Category
                  </label>
                  <select
                    id="category"
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Or create a new category
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">
                        New Category Name
                      </label>
                      <input
                        type="text"
                        id="newCategory"
                        value={formData.newCategory}
                        onChange={(e) => setFormData(prev => ({ ...prev, newCategory: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                      />
                    </div>

                    <div>
                      <label htmlFor="newCategoryDescription" className="block text-sm font-medium text-gray-700">
                        Category Description
                      </label>
                      <textarea
                        id="newCategoryDescription"
                        value={formData.newCategoryDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, newCategoryDescription: e.target.value }))}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Features</h3>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = e.target.value;
                        setFormData(prev => ({ ...prev, features: newFeatures }));
                      }}
                      placeholder="Enter a feature"
                      className="flex-1 border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = formData.features.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, features: newFeatures }));
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))}
                  className="btn btn-outline"
                >
                  Add Feature
                </button>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Specifications</h3>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => {
                        const newSpecs = [...formData.specifications];
                        newSpecs[index].key = e.target.value;
                        setFormData(prev => ({ ...prev, specifications: newSpecs }));
                      }}
                      placeholder="Specification name"
                      className="flex-1 border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => {
                        const newSpecs = [...formData.specifications];
                        newSpecs[index].value = e.target.value;
                        setFormData(prev => ({ ...prev, specifications: newSpecs }));
                      }}
                      placeholder="Value"
                      className="flex-1 border border-gray-300 rounded-[2deg] shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newSpecs = formData.specifications.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, specifications: newSpecs }));
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    specifications: [...prev.specifications, { key: '', value: '' }]
                  }))}
                  className="btn btn-outline"
                >
                  Add Specification
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}