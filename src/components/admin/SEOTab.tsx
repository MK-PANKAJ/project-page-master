import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "./ImageUpload";

interface PageMetadata {
  id: string;
  page_path: string;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string | null;
}

export function SEOTab() {
  const [pages, setPages] = useState<PageMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageMetadata | null>(null);
  const [formData, setFormData] = useState({
    page_path: "",
    meta_title: "",
    meta_description: "",
    og_title: "",
    og_description: "",
    og_image: null as string | null,
    canonical_url: "",
    robots: "index, follow",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from("page_metadata")
        .select("*")
        .order("page_path", { ascending: true });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPage) {
        const { error } = await supabase
          .from("page_metadata")
          .update(formData)
          .eq("id", editingPage.id);

        if (error) throw error;
        toast({ title: "Success", description: "Page metadata updated" });
      } else {
        const { error } = await supabase
          .from("page_metadata")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Page metadata added" });
      }

      fetchPages();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (page: PageMetadata) => {
    setEditingPage(page);
    setFormData({
      page_path: page.page_path,
      meta_title: page.meta_title || "",
      meta_description: page.meta_description || "",
      og_title: page.og_title || "",
      og_description: page.og_description || "",
      og_image: page.og_image,
      canonical_url: page.canonical_url || "",
      robots: page.robots || "index, follow",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPage(null);
    setFormData({
      page_path: "",
      meta_title: "",
      meta_description: "",
      og_title: "",
      og_description: "",
      og_image: null,
      canonical_url: "",
      robots: "index, follow",
    });
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SEO & Page Metadata</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Page Metadata
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? "Edit Page Metadata" : "Add Page Metadata"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Page Path</Label>
                <Input
                  value={formData.page_path}
                  onChange={(e) => setFormData({ ...formData, page_path: e.target.value })}
                  placeholder="/about, /contact, etc."
                  required
                  disabled={!!editingPage}
                />
              </div>

              <div>
                <Label>Meta Title (Max 60 chars)</Label>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  maxLength={60}
                />
                <span className="text-xs text-muted-foreground">{formData.meta_title.length}/60</span>
              </div>

              <div>
                <Label>Meta Description (Max 160 chars)</Label>
                <Textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  maxLength={160}
                  rows={3}
                />
                <span className="text-xs text-muted-foreground">{formData.meta_description.length}/160</span>
              </div>

              <div>
                <Label>OG Title</Label>
                <Input
                  value={formData.og_title}
                  onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                  maxLength={60}
                />
              </div>

              <div>
                <Label>OG Description</Label>
                <Textarea
                  value={formData.og_description}
                  onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                  maxLength={160}
                  rows={3}
                />
              </div>

              <ImageUpload
                bucket="resource-files"
                currentUrl={formData.og_image}
                onUploadComplete={(url) => setFormData({ ...formData, og_image: url })}
                onRemove={() => setFormData({ ...formData, og_image: null })}
                label="OG Image (1200x630px recommended)"
              />

              <div>
                <Label>Canonical URL</Label>
                <Input
                  value={formData.canonical_url}
                  onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                  placeholder="https://example.com/page"
                />
              </div>

              <div>
                <Label>Robots</Label>
                <Input
                  value={formData.robots}
                  onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                  placeholder="index, follow"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPage ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page Path</TableHead>
            <TableHead>Meta Title</TableHead>
            <TableHead>Meta Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell className="font-medium">{page.page_path}</TableCell>
              <TableCell className="text-sm">{page.meta_title || "-"}</TableCell>
              <TableCell className="text-sm max-w-md truncate">{page.meta_description || "-"}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEditDialog(page)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
