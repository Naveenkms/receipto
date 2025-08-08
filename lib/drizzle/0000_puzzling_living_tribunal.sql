CREATE TABLE "receipts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"store_name" text,
	"store_address" text,
	"phone_number" text,
	"date" text,
	"time" text,
	"items" jsonb,
	"subtotal" numeric(10, 2),
	"tax" numeric(10, 2),
	"total" numeric(10, 2) NOT NULL,
	"payment_method" varchar(100),
	"cashier" varchar(255),
	"customer_name" varchar(255),
	"customer_email" varchar(255),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "receipts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "users can create receipts" ON "receipts" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);--> statement-breakpoint
CREATE POLICY "users can see their own receipts" ON "receipts" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "users can delete their own receipts" ON "receipts" AS PERMISSIVE FOR DELETE TO "authenticated" USING (true);