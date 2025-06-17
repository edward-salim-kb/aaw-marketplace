import { db } from "@src/db";
import { eq, and } from "drizzle-orm";
import * as schema from "@db/schema/categories";

export const findCategoryByName = async (tenantId: string, name: string) => {
    const result = await db
        .select()
        .from(schema.categories)
        .where(
            and(
                eq(schema.categories.name, name),
                eq(schema.categories.tenant_id, tenantId)
            )
        )
        .limit(1);

    return result;
};
