import { db } from "@src/db";
import * as schema from "@db/schema/products";
import { eq, and } from "drizzle-orm";

export const getProductById = async (tenantId: string, id: string) => {
  const result = await db
    .select()
    .from(schema.products)
    .where(
      and(eq(schema.products.tenant_id, tenantId), eq(schema.products.id, id))
    );
  return result?.[0];
};
