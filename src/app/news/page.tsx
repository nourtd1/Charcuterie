"use client";

import { products } from "@/lib/data";
import { ProductCard, ProductDetailsDialog } from "@/components/ProductCatalog";
import type { Product } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";

export default function NewsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    }

    const handleDialogChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            setSelectedProduct(null);
        }
    }

    // Example: show the 3 most recent products as "news"
    const newProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 3);

    return (
        <div className="bg-background">
            {/* Hero */}
            <header className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
                <Image
                    src="/assets/images/banners/accueil_banner.jpg"
                    alt="Nouveautés"
                    fill
                    sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
                    className="object-cover -z-20"
                    priority
                />
                <div className="absolute inset-0 -z-10 hero-overlay" />
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nos Nouveautés</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">Découvrez les derniers trésors ajoutés à notre collection.</p>
                </div>
            </header>
            <div className="container mx-auto py-16 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
                    ))}
                </div>
                 <ProductDetailsDialog product={selectedProduct} open={isDialogOpen} onOpenChange={handleDialogChange} />
            </div>
        </div>
    );
}
