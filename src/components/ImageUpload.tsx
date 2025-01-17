import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { convertToBase64, validateImageFile } from '../utils/imageUtils';

interface ImageUploadProps {
  onImageAdd: (imageData: { data: string; type: string }) => void;
  onImageRemove: () => void;
  imagePreview?: string;
}

export default function ImageUpload({ onImageAdd, onImageRemove, imagePreview }: ImageUploadProps) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      setLoading(true);
      validateImageFile(file);
      
      const base64 = await convertToBase64(file);
      onImageAdd({ data: base64, type: file.type });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-[2deg]"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
          />
          <div className="border-2 border-dashed border-gray-300 rounded-[2deg] p-4 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-1 text-sm text-gray-500">
              {loading ? 'Processing...' : 'Click or drag image to upload'}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              JPEG, PNG or WebP up to 5MB
            </p>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}