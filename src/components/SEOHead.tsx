import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEOHead({ title, description, image, type = "website" }: SEOHeadProps) {
  const location = useLocation();
  const [pageMetadata, setPageMetadata] = useState<any>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const { data } = await supabase
        .from("page_metadata")
        .select("*")
        .eq("page_path", location.pathname)
        .maybeSingle();

      if (data) {
        setPageMetadata(data);
      }
    };

    fetchMetadata();
  }, [location.pathname]);

  const defaultTitle = "Happy Space World – Student Mental Wellness";
  const defaultDescription = "Empowering students with accessible mental wellness support through counseling, resources, and community.";
  const defaultImage = "https://ebaa830d-b1c9-4a1f-9061-27e0651ce5b1.lovableproject.com/og-image.jpg";

  const finalTitle = pageMetadata?.meta_title || title || defaultTitle;
  const finalDescription = pageMetadata?.meta_description || description || defaultDescription;
  const finalImage = pageMetadata?.og_image || image || defaultImage;
  const finalOgTitle = pageMetadata?.og_title || finalTitle;
  const finalOgDescription = pageMetadata?.og_description || finalDescription;

  const siteUrl = window.location.origin;
  const canonicalUrl = pageMetadata?.canonical_url || `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {pageMetadata?.robots && <meta name="robots" content={pageMetadata.robots} />}

      {/* Open Graph */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Happy Space World" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={pageMetadata?.twitter_card || "summary_large_image"} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#52A5A5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
  );
}
