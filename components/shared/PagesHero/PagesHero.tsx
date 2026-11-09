"use client"
import { useBrands } from '@/context/brandsContext';
import { useCategories } from '@/context/categoriesContext';
import { Box, Layers, Layers2, LucideIcon, Tag } from 'lucide-react'; // You can change this icon to any other Lucide icon
import { usePathname, useSearchParams } from 'next/navigation';
import path from 'path';


// Create a local lookup map for icons
const iconMap: Record<string, LucideIcon> = {
    box: Box,
    layers: Layers,
    tag: Tag,
};
export interface PagesHeroProps {
    pageInfo: {
        title: string;
        subtitle: string
        Icon: string,
        mainColor?: string,
        shapesColor?: string
    }
    searchParam?: {
        category?: string,
        brand?: string,
        subcategory?: string,

    }
}
export function PagesHero({ searchParam, pageInfo }: PagesHeroProps) {

    const pathname = usePathname();
    const { allCategories, allSubcategories } = useCategories();
    const { allBrands } = useBrands();
    let pathSegments: string[];
    let categoryName: string | undefined;
    let brandName: string | undefined;
    let subCategoryName: string | undefined;

    if (searchParam && JSON.stringify(searchParam) !== '{}') {
        pathSegments = Object.keys(searchParam);
        if (allCategories && searchParam.category) {
            categoryName = allCategories.find((category) => searchParam.category === category._id)?.name;

            if (categoryName) {

                pathSegments.push(categoryName);
            }
        }
        if (allBrands && searchParam.brand) {
            brandName = allBrands.find((brand) => searchParam.brand === brand._id)?.name;

            if (brandName) {
                pathSegments.push(brandName);

            }
        }
        if (allSubcategories && searchParam.subcategory) {
            subCategoryName = allSubcategories.find((subCategory) => searchParam.subcategory === subCategory._id)?.name;

            if (subCategoryName) {
                pathSegments.push(subCategoryName);

            }
        }
    }
    else {
        pathSegments = pathname.split('/').filter((segment) => segment !== '');


        pathSegments = pathSegments.map((path) => path = allCategories?.find((category) => path === category._id)?.name || path);
        pathSegments = pathSegments.map((path) => path = allSubcategories?.find((subcategory) => path === subcategory._id)?.name || path);

    }

    const SelectedIcon = iconMap[pageInfo.Icon];
    return (
        <div className={`w-full ${pageInfo.mainColor ? pageInfo.mainColor : "bg-primary"} text-white py-10 md:py-14 relative overflow-hidden`}>

            {/* Background design shapes to match the gradient visual depth */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className={`absolute top-12 right-12 w-48 h-48 ${pageInfo.shapesColor} rounded-full pointer-events-none`} />

            <div className="max-w-350 mx-auto px-6 flex flex-col gap-4 relative z-10">

                {/* 1. Breadcrumbs Navigation */}
                <nav className="flex items-center gap-1.5 text-xs font-medium text-emerald-100/90 tracking-wide">
                    <a href="/" className="hover:text-white transition-colors">
                        Home
                    </a>
                    {pathSegments.length > 0 && pathSegments.map((pathItem, idx) => <div key={idx}>
                        <span className="text-emerald-200/50 mx-0.5">/ </span>
                        <span className="text-white font-semibold capitalize">
                            {pathItem}
                        </span>
                    </div>)}
                </nav>

                {/* 2. Main Hero Layout (Icon Box + Text Details) */}
                <div className="flex items-center gap-4 mt-2">

                    {/* Glassmorphic Icon Wrapper matching the design radius and transparency */}
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-xs shrink-0">
                        <SelectedIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                    </div>

                    {/* Titles Group */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-none">
                            {categoryName ? categoryName : pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : pageInfo.title}
                        </h1>
                        <p className="text-xs md:text-sm text-emerald-50/80 font-medium">
                            {categoryName ? `Browse products in ${categoryName}` : pathSegments.length > 1 ? `Browse products in ${pathSegments[pathSegments.length - 1]}` : pageInfo.title}

                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
