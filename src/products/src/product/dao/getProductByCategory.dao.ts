import { db } from "@src/db";
import * as schema from "@db/schema/products";
import { eq, and } from "drizzle-orm";

export const getProductByCategory = async (
  tenantId: string,
  category_id: string
) => {
  const result = await db
    .select()
    .from(schema.products)
    .where(
      and(
        eq(schema.products.tenant_id, tenantId),
        eq(schema.products.category_id, category_id)
      )
    );
  return result;
};
