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
            { name: "Documentation", href: "https://docs.wetrocloud.com" },
            { name: "Playground", href: "https://docs.wetrocloud.com" },
          ],
        },
        {
          title: "Company",
          links: [
            // { name: "About", href: "https://wetrocloud.com/about" },
            { name: "Blog", href: "https://medium.com/@wetrocloud" },
            { name: "Pricing", href: "https://wetrocloud.com/pricing" },
            { name: "Book a Demo", href: "https://cal.com/divinejoshua/wetrocloud-demo" },
          ],
        },
        {
          title: "Resources",
          links: [
            { name: "Help Center", href: "https://discord.gg/3XqN6zWM5f" },
            { name: "Support", href: "https://discord.gg/3XqN6zWM5f" },
            { name: "Privacy", href: "https://wetrocloud.com/legal/privacy-policy" },
          ],
        },
      ]}
      copyright={`© ${new Date().getFullYear()} Wetrocloud. All rights reserved.`}
      legalLinks={[
        { name: "Terms of Service", href: "https://wetrocloud.com/legal/terms-of-service" },
        { name: "Privacy Policy", href: "https://wetrocloud.com/legal/privacy-policy" },
      ]}
    />
  );
};

