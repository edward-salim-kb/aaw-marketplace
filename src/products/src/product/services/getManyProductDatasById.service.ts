import { InternalServerErrorResponse, BadRequestResponse } from "@src/commons/patterns";
import { getManyProductDatasById } from "../dao/getManyProductDatasById.dao";

export const getManyProductDatasByIdService = async (productIds: string[]) => {
    try {
        if (!productIds || productIds.length === 0) {
            return new BadRequestResponse('Product IDs are required').generate();
        }

        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server Tenant ID not found').generate();
        }

        const products = await getManyProductDatasById(SERVER_TENANT_ID, productIds);

        return {
            data: products,
            status: 200
        };
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
};
