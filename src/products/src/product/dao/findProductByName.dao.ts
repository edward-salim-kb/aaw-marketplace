import { db } from "@src/db";
import { eq, and } from "drizzle-orm";
import * as schema from "@db/schema/products";

export const findProductByName = async (tenantId: string, name: string) => {
    const result = await db
        .select()
        .from(schema.products)
        .where(
            and(
                eq(schema.products.name, name),
                eq(schema.products.tenant_id, tenantId)
            )
        )
        .limit(1);

    return result;
};
