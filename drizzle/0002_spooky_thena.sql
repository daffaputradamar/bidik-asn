CREATE TABLE IF NOT EXISTS "bidikasn_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
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
