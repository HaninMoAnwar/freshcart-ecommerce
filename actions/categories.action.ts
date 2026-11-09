"use server"
const baseUrl = process.env.BASE_URL;
export async function getAllCategories() {

    const response = await fetch(`${baseUrl}/api/v1/categories`,{ cache: 'force-cache' });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching all categoires`);
    }

    return data;

}
export async function getAllSubcategories() {

    const response = await fetch(`${baseUrl}/api/v1/subcategories`,{ cache: 'force-cache' });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `${response.status}, Something went wrong while fetching all subcategories`);
    }

    return data;

}