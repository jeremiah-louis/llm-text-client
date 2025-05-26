import { Footer7 } from "@/components/ui/footer-7";

export const Footer = () => {
  return (
    <Footer7
      logo={{
        url: "https://wetrocloud.com",
        src: "/Logo-wetrocloud.svg",
        alt: "Wetrocloud Logo",
        title: "Wetrocloud",
      }}
      description="Power your AI applications with clean structured data from all types of resources. Web, File, Image, Audio, Video & Youtube."
      sections={[
        {
          title: "Product",
          links: [
            // TODO: Update footer links to match actual routes and pages
            // - URL to Markdown: Update href when landing page is ready
            // - Pricing: Update href when pricing page is implemented
            // - Documentation: Update href when docs are migrated
            // - API Reference: Update href when API docs are ready
            { name: "URL to Markdown", href: "/" },
            { name: "Pricing", href: "/pricing" },
            { name: "Documentation", href: "/docs" },
            { name: "API Reference", href: "/api" },
          ],
        },
        {
          title: "Company",
          links: [
            { name: "About", href: "https://wetrocloud.com/about" },
            { name: "Blog", href: "https://wetrocloud.com/blog" },
            { name: "Careers", href: "https://wetrocloud.com/careers" },
            { name: "Contact", href: "https://wetrocloud.com/contact" },
          ],
        },
        {
          title: "Resources",
          links: [
            { name: "Help Center", href: "/help" },
            { name: "Support", href: "/support" },
            { name: "Status", href: "/status" },
            { name: "Privacy", href: "/privacy" },
          ],
        },
      ]}
      copyright={`© ${new Date().getFullYear()} Wetrocloud. All rights reserved.`}
      legalLinks={[
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ]}
    />
  );
};

