import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace global {
  let POSTGRES_CLIENT: postgres.Sql | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global.POSTGRES_CLIENT) {
    global.POSTGRES_CLIENT = postgres(process.env.DATABASE_URL, {
      // IMPORTANT:
      // Disable prefetch as it is not supported for "Transaction" pool mode
      // See:
      // https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle
      prepare: false,
    });
  }
} else {
  global.POSTGRES_CLIENT = postgres(process.env.DATABASE_URL, {
    // IMPORTANT:
    // Disable prefetch as it is not supported for "Transaction" pool mode
    // See:
    // https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle
    prepare: false,
  });
}

export const db = drizzle(global.POSTGRES_CLIENT, { schema });
