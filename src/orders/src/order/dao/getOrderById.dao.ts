import { db } from "@src/db";
import * as schema from "@db/schema/order";
import { and, eq } from "drizzle-orm";

export const getOrderById = async (
  tenant_id: string,
  user_id: string,
  order_id: string
) => {
  const result = await db
    .select()
    .from(schema.order)
    .where(
      and(
        eq(schema.order.tenant_id, tenant_id),
        eq(schema.order.user_id, user_id),
        eq(schema.order.id, order_id)
      )
    );
  return result[0];
};
