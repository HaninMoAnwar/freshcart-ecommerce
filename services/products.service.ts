
const baseUrl = process.env.BASE_URL;

export async function getAllProducts() {
    const response = await fetch(`${baseUrl}/api/v1/products`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching all products`);

    }
    return data;
}
export async function getFeaturedProducts() {

    const params = {
        sort: "-sold"
    }
    const queryParam = new URLSearchParams(params).toString();
    const response = await fetch(`${baseUrl}/api/v1/products?${queryParam}`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching featured products`);

    }
    return data;
}
export async function getSingleProduct(productId: string) {

    const response = await fetch(`${baseUrl}/api/v1/products/${productId}`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching product details`);

    }
    return data;
}