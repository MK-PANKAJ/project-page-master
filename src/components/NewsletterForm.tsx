import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  honeypot: z.string().max(0, "Invalid submission")
});

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      console.warn("Bot detected via honeypot");
      return;
    }
    
    setLoading(true);

    try {
      // Validate email
      const validated = emailSchema.parse({ email, honeypot });

      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: validated.email },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: data?.message || "You've been subscribed to our newsletter",
      });
      setEmail("");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid Email",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
          disabled={loading}
          required
          aria-label="Email address for newsletter"
        />
        {/* Honeypot field - hidden from users but visible to bots */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px'
          }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
      <Button type="submit" disabled={loading} className="min-w-[120px]">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
