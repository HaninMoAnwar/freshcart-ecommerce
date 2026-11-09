"use server"
const baseUrl = process.env.BASE_URL;

export async function getProductsbyCategory(categoryId: string) {

    const params = {
        'category[in]': categoryId
    }
    const queryParam = new URLSearchParams(params).toString();

    const response = await fetch(`${baseUrl}/api/v1/products?${queryParam}`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching similar category products`);

    }

    return data;

}
export async function getProductsbyBrand(brandId: string) {

    const params = {
        'brand': brandId
    }
    const queryParam = new URLSearchParams(params).toString();

    const response = await fetch(`${baseUrl}/api/v1/products?${queryParam}`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching similar brand products`);

    }

    return data;

}
export async function getProductsbySubcategory(subcategoryId: string) {

    const params = {
        'subcategory[in]': subcategoryId
    }
    const queryParam = new URLSearchParams(params).toString();

    const response = await fetch(`${baseUrl}/api/v1/products?${queryParam}`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching similar brand products`);

    }

    return data;

}