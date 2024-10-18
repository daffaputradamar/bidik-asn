CREATE TABLE IF NOT EXISTS "bidikasn_cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"province_id" integer NOT NULL,
	"code" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bidikasn_districts" (
	"id" serial PRIMARY KEY NOT NULL,
	"city_id" integer NOT NULL,
	"code" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bidikasn_provinces" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bidikasn_villages" (
	"id" serial PRIMARY KEY NOT NULL,
	"district_id" integer NOT NULL,
	"code" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL
);
