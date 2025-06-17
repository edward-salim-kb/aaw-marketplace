import { InternalServerErrorResponse, NotFoundResponse } from "@src/commons/patterns";
import { getProductByCategory } from "../dao/getProductByCategory.dao";

export const getProductByCategoryService = async (category_id: string) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server Tenant ID not found').generate();
        }

        const products = await getProductByCategory(SERVER_TENANT_ID, category_id);

        if (!products || products.length === 0) {
            return new NotFoundResponse('No products found for this category').generate();
        }

        return {
            data: { products },
            status: 200
        };
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
};
