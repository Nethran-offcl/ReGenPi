import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface RecognizedItem {
  name: string;
  confidence: number;
  category: string;
  quantity: string;
}

const BulkUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recognizedItems, setRecognizedItems] = useState<RecognizedItem[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const processImage = async (file: File): Promise<RecognizedItem> => {
    // Create form data for the image
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Call the image recognition API
      const response = await fetch('/api/recognize-waste', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      return {
        name: data.name,
        confidence: data.confidence,
        category: data.category,
        quantity: data.quantity,
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);
    setProgress(0);
    const results: RecognizedItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await processImage(file);
        results.push(result);
        
        // Update progress
        setProgress(((i + 1) / files.length) * 100);
      }

      setRecognizedItems(results);
      toast.success('Successfully processed all images');
    } catch (error) {
      toast.error('Error processing images');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="bulk-upload"
              />
              <label
                htmlFor="bulk-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm text-gray-500">
                  Click to upload images or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports JPG, PNG up to 10MB
                </p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Selected {files.length} file(s)
                </p>
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full"
                >
                  {uploading ? 'Processing...' : 'Process Images'}
                </Button>
              </div>
            )}

            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-center text-gray-500">
                  Processing images... {Math.round(progress)}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {recognizedItems.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Recognized Items</h3>
            <div className="space-y-4">
              {recognizedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Category: {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      Confidence: {Math.round(item.confidence * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkUpload; 