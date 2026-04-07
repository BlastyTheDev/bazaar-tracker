CREATE TABLE "items" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE "prices" (
	"item_id" text NOT NULL,
	"time" integer NOT NULL,
	"sell" integer NOT NULL,
	"supply" integer NOT NULL,
	"sell_vol" integer NOT NULL,
	"offers" integer NOT NULL,
	"buy" integer NOT NULL,
	"demand" integer NOT NULL,
	"buy_vol" integer NOT NULL,
	"orders" integer NOT NULL,
	CONSTRAINT "prices_item_id_time_pk" PRIMARY KEY("item_id","time")
);
--> statement-breakpoint
ALTER TABLE "prices" ADD CONSTRAINT "prices_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;