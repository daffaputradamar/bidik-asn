CREATE TABLE IF NOT EXISTS "ad_youtubes" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" varchar NOT NULL,
	"description" varchar,
	"thumbnail" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
