CREATE TABLE IF NOT EXISTS "ad_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"link" varchar NOT NULL,
	"file_name" varchar NOT NULL,
	"file_path" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
