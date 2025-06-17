import { db } from "@src/db";
import * as schema from "@db/schema/products";
import { eq, and } from "drizzle-orm";

export const getAllProductsByTenantId = async (tenantId: string) => {
  const result = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.tenant_id, tenantId));
  return result;
};
