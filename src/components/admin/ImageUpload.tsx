import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Loader2, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { convertToWebP, supportsWebP } from "@/lib/imageUtils";

interface ImageUploadProps {
  bucket: string;
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  accept?: string;
  fallbackUrl?: string;
}

export function ImageUpload({
  bucket,
  currentUrl,
  onUploadComplete,
  onRemove,
  label = "Image",
  accept = "image/*",
  fallbackUrl
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    try {
      new URL(urlInput);
      setPreviewUrl(urlInput);
      onUploadComplete(urlInput);
      setUrlInput("");
      toast({
        title: "Success",
        description: "Image URL added successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Invalid URL format",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Convert to WebP if supported and if it's an image
      let fileToUpload = file;
      if (supportsWebP() && file.type.startsWith('image/')) {
        try {
          fileToUpload = await convertToWebP(file, 0.85);
          toast({
            title: "Optimizing",
            description: "Converting image to WebP format...",
          });
        } catch (conversionError) {
          console.warn('WebP conversion failed, uploading original:', conversionError);
          // Continue with original file if conversion fails
        }
      }

      // Create unique filename
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    if (onRemove) {
      onRemove();
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {previewUrl ? (
        <div className="relative inline-block">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border"
            onError={(e) => {
              if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
                e.currentTarget.src = fallbackUrl;
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {label}
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Max 5MB, {accept.split('/')[0]} files only
            </p>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
              />
              <Button type="button" onClick={handleUrlSubmit}>
                <Link2 className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter a direct image URL
            </p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
