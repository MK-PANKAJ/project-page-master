import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./ImageUpload";
import { Loader2 } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  image_url: string | null;
  is_active: boolean;
}

export function AnnouncementsTab() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAnnouncement(data);
        setTitle(data.title);
        setMessage(data.message);
        setImageUrl(data.image_url || "");
        setIsActive(data.is_active);
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Title and message are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const announcementData = {
        title: title.trim(),
        message: message.trim(),
        image_url: imageUrl || null,
        is_active: isActive,
      };

      if (announcement) {
        const { error } = await supabase
          .from("announcements")
          .update(announcementData)
          .eq("id", announcement.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("announcements")
          .insert([announcementData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Announcement saved successfully",
      });

      fetchAnnouncement();
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast({
        title: "Error",
        description: "Failed to save announcement",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Announcement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Announcement message"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label>Banner Image (Optional)</Label>
          <ImageUpload
            bucket="gallery-images"
            onUploadComplete={(url) => setImageUrl(url)}
            currentUrl={imageUrl}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is-active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="is-active">
            {isActive ? "Announcement is Active" : "Announcement is Inactive"}
          </Label>
        </div>

        <Button onClick={handleSave} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Announcement
        </Button>
      </CardContent>
    </Card>
  );
}
