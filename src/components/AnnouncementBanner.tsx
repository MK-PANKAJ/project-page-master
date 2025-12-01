import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Announcement {
  id: string;
  title: string;
  message: string;
  image_url: string | null;
  is_active: boolean;
}

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAnnouncement(data);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!announcement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{announcement.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {announcement.image_url && (
            <img
              src={announcement.image_url}
              alt={announcement.title}
              className="w-full h-auto rounded-lg object-cover max-h-96"
            />
          )}
          <p className="text-muted-foreground whitespace-pre-wrap">
            {announcement.message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
