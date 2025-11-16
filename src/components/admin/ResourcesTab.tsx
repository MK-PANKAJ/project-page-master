import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string | null;
  thumbnail_url: string | null;
  downloads: number;
  is_active: boolean;
  created_at: string;
}

export function ResourcesTab() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "worksheet" as const,
    file_url: "",
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
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
      if (editingId) {
        const { error } = await supabase
          .from('resources')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Resource updated" });
      } else {
        const { error } = await supabase
          .from('resources')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Resource added" });
      }

      setDialogOpen(false);
      setEditingId(null);
      setFormData({ title: "", description: "", category: "worksheet", file_url: "", is_active: true });
      fetchResources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Resource deleted" });
      fetchResources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (resource: Resource) => {
    setEditingId(resource.id);
    setFormData({
      title: resource.title,
      description: resource.description || "",
      category: resource.category as any,
      file_url: resource.file_url || "",
      is_active: resource.is_active,
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading resources...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resources</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingId(null);
              setFormData({ title: "", description: "", category: "worksheet", file_url: "", is_active: true });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Resource</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worksheet">Worksheet</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file_url">File URL</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="is_active">Active (visible to users)</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Add"} Resource
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {resources.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No resources yet. Add your first one!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge>{resource.category}</Badge>
                      {resource.is_active ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                      <Badge variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        {resource.downloads} downloads
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(resource)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(resource.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {resource.description && (
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                )}
                {resource.file_url && (
                  <a 
                    href={resource.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View File →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
