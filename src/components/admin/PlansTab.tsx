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
import { Plus, Trash2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_weeks: number | null;
  features: string[];
  plan_type: string;
  is_active: boolean;
  display_order: number;
  contact_message: string | null;
  created_at: string;
}

export function PlansTab() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration_weeks: 4,
    features: "",
    plan_type: "student" as const,
    is_active: true,
    display_order: 0,
    contact_message: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Parse JSON features field
      const plansData = (data || []).map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : 
                  typeof plan.features === 'string' ? JSON.parse(plan.features) : []
      }));
      
      setPlans(plansData);
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
      const featuresArray = formData.features
        .split('\n')
        .filter(f => f.trim())
        .map(f => f.trim());

      const submitData = {
        ...formData,
        features: featuresArray,
      };

      if (editingId) {
        const { error } = await supabase
          .from('plans')
          .update(submitData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Plan updated" });
      } else {
        const { error } = await supabase
          .from('plans')
          .insert([submitData]);

        if (error) throw error;
        toast({ title: "Success", description: "Plan added" });
      }

      setDialogOpen(false);
      setEditingId(null);
      setFormData({ name: "", description: "", price: 0, duration_weeks: 4, features: "", plan_type: "student", is_active: true, display_order: 0, contact_message: "" });
      fetchPlans();
      // Invalidate queries to refresh Students and Schools pages
      queryClient.invalidateQueries({ queryKey: ['student-plan'] });
      queryClient.invalidateQueries({ queryKey: ['school-plans'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Plan deleted" });
      fetchPlans();
      // Invalidate queries to refresh Students and Schools pages
      queryClient.invalidateQueries({ queryKey: ['student-plan'] });
      queryClient.invalidateQueries({ queryKey: ['school-plans'] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (plan: Plan) => {
    setEditingId(plan.id);
    setFormData({
      name: plan.name,
      description: plan.description || "",
      price: plan.price,
      duration_weeks: plan.duration_weeks || 4,
      features: Array.isArray(plan.features) ? plan.features.join('\n') : "",
      plan_type: plan.plan_type as any,
      is_active: plan.is_active,
      display_order: plan.display_order,
      contact_message: plan.contact_message || "",
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading plans...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Plans</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingId(null);
              setFormData({ name: "", description: "", price: 0, duration_weeks: 4, features: "", plan_type: "student", is_active: true, display_order: 0, contact_message: "" });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Plan</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration_weeks}
                    onChange={(e) => setFormData({ ...formData, duration_weeks: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="plan_type">Plan Type</Label>
                <Select value={formData.plan_type} onValueChange={(value: any) => setFormData({ ...formData, plan_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={6}
                  placeholder="Weekly counseling sessions&#10;Pet therapy access&#10;Progress tracking"
                />
              </div>
              <div>
                <Label htmlFor="contact_message">Contact Form Message (Optional)</Label>
                <Textarea
                  id="contact_message"
                  value={formData.contact_message}
                  onChange={(e) => setFormData({ ...formData, contact_message: e.target.value })}
                  rows={3}
                  placeholder="Custom message that will appear in the contact form when users click to book this plan..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This message will pre-fill the contact form when students/schools click to book this plan
                </p>
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
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
                {editingId ? "Update" : "Add"} Plan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No plans yet. Add your first one!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {plans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge>{plan.plan_type}</Badge>
                      {plan.is_active ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                      <Badge variant="outline">Order: {plan.display_order}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(plan)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(plan.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">${plan.price}</span>
                    {plan.duration_weeks && (
                      <span className="text-sm text-muted-foreground">/ {plan.duration_weeks} weeks</span>
                    )}
                  </div>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  )}
                  {Array.isArray(plan.features) && plan.features.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2">Features:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
