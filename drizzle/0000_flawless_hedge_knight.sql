CREATE TYPE "public"."event_category" AS ENUM('Official BKN', 'Event', 'Webinar', 'TO Akbar');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ad_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"link" varchar NOT NULL,
	"file_name" varchar NOT NULL,
	"file_path" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ad_youtubes" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" varchar NOT NULL,
	"description" varchar NOT NULL,
	"thumbnail" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events_calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"dtfrom" timestamp NOT NULL,
	"dtto" timestamp NOT NULL,
	"description" text NOT NULL,
	"event_category" "event_category" NOT NULL,
	"category_color" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bidikasn_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"province_code" varchar(10) NOT NULL,
	"province_name" varchar(255) NOT NULL,
	"city_code" varchar(10) NOT NULL,
	"city_name" varchar(255) NOT NULL,
	"district_code" varchar(10) NOT NULL,
	"district_name" varchar(255) NOT NULL,
	"village_code" varchar(10) NOT NULL,
	"village_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
