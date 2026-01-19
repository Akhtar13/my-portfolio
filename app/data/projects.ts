export type Project = {
    slug: string;
    title: string;
    description: string;
    stack: string[];
    liveUrl?: string;
    repoUrl?: string;
};

export const projects: Project[] = [
    {
        slug: "launch-your-app",
        title: "Launch Your App",
        description: "Multi-tenant platform with custom domains, SSL automation, and merchant onboarding.",
        stack: ["Laravel", "Nginx", "Cloudflare", "Stripe"],
        liveUrl: "https://your-live-link.com",
    },
    {
        slug: "ecommerce-multicurrency",
        title: "Multi-Currency E-commerce",
        description: "Checkout, tax/discount calculations, and gateway routing with currency conversion.",
        stack: ["Laravel", "Stripe", "MyFatoorah"],
    },
];
