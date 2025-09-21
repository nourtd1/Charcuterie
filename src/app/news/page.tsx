"use client";

import { products } from "@/lib/data";
import { ProductCard, ProductDetailsDialog } from "@/components/ProductCatalog";
import type { Product } from "@/lib/types";
import { useState } from "react";

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
            <div className="container mx-auto py-16 md:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black font-headline text-primary">Nos Nouveautés</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Découvrez les derniers trésors ajoutés à notre collection.
                    </p>
                </div>
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
