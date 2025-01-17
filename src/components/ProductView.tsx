import { useState } from 'react';
import { Product } from '../types/product';
import { X, ShoppingCart } from 'lucide-react';

interface ProductViewProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}

export default function ProductView({ product, onClose, onAddToCart }: ProductViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[2deg] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-[2deg] overflow-hidden">
                <img
                  src={product.images[selectedImage].data}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-[2deg] overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.data}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  KES {product.price.toLocaleString()}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {Object.keys(product.specifications).length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-500">{key}:</span>
                        <span className="ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={onAddToCart}
                className="w-full btn btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}