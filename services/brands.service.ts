"use server"
const baseUrl = process.env.BASE_URL;

export async function getAllBrands() {
    const response = await fetch(`${baseUrl}/api/v1/brands`,
        {
            cache: "force-cache",
        });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching all brands`);

    }
    return data;
}