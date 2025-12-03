import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calendar, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const isMobile = useIsMobile();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Sharing Logic ---

  // 1. Native Share (Mobile)
  const handleNativeShare = async () => {
    if (post && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || "Read this article on Happy Space World",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for mobile browsers that might not support it (rare)
      handleCopyLink();
    }
  };

  // 2. Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Article link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // 3. Social Share Helpers (Desktop)
  const shareLinks = {
    whatsapp: () => {
      const text = encodeURIComponent(`${post?.title}\n\nRead more at: ${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    },
    facebook: () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
    },
    twitter: () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || '')}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    },
    linkedin: () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.content.substring(0, 160)}
        image={post.og_image || post.cover_image_url || undefined}
        type="article"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <article className="max-w-3xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {post.tags.join(", ")}
                </div>
              )}
            </div>

            {post.cover_image_url && (
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
                loading="eager"
              />
            )}

            <div 
              className="prose prose-lg max-w-none"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {post.content}
            </div>

            {/* --- All-in-One Share Section --- */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="h-5 w-5" />
                  <span className="font-semibold text-foreground">Share this article</span>
                </div>
                
                <div>
                  {isMobile ? (
                    /* Mobile: Single Button triggering Native Share Sheet */
                    <Button 
                      onClick={handleNativeShare} 
                      className="bg-primary hover:bg-primary-dark text-white font-medium min-w-[140px]"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  ) : (
                    /* Desktop: Dropdown Menu with all options */
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-primary hover:bg-primary-dark text-white font-medium min-w-[140px]">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                          {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareLinks.whatsapp} className="cursor-pointer">
                          <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
                          WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareLinks.facebook} className="cursor-pointer">
                          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                          Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareLinks.twitter} className="cursor-pointer">
                          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                          Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={shareLinks.linkedin} className="cursor-pointer">
                          <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
                          LinkedIn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
        }
