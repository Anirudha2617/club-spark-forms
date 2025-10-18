import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (imageUrl: string) => void;
}

export const ImageUploadDialog = ({ open, onOpenChange, onUpload }: ImageUploadDialogProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setPreview(url);
  };

  const handleSubmit = () => {
    if (imageUrl.trim()) {
      onUpload(imageUrl);
      setImageUrl('');
      setPreview('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-elevated border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Attach Image
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="glass"
            />
          </div>

          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-border"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-background/80"
                onClick={() => {
                  setPreview('');
                  setImageUrl('');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!imageUrl.trim()} className="glow-primary">
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
