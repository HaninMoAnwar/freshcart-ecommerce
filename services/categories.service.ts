const baseUrl = process.env.BASE_URL;


export async function getAllSubcategories(categoryId:string){
    const response = await fetch(`${baseUrl}/api/v1/categories/${categoryId}/subcategories`);
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || `${response.status}, Something went wrong while fetching all subcategories`)
    }
    return data;

}