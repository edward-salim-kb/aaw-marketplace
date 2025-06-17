import { db } from "@src/db";
import * as schema from "@db/schema/categories";
import { eq, and } from "drizzle-orm";

export const getAllCategoriesByTenantId = async (tenantId: string) => {
  const result = await db
    .select()
    .from(schema.categories)
    .where(eq(schema.categories.tenant_id, tenantId));
  return result;
};
