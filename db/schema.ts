import {
  boolean,
  pgEnum,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `bidikasn_${name}`);

export const users = createTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  isEmailVerified: boolean('is_email_verified').notNull().default(false),
  phoneNumber: varchar('phone_number', { length: 15 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  
  role: varchar('role', { length: 255 }).notNull(),

  // Province
  provinceCode: varchar('province_code', { length: 10 }).notNull(),
  provinceName: varchar('province_name', { length: 255 }).notNull(),
  
  // City
  cityCode: varchar('city_code', { length: 10 }).notNull(),
  cityName: varchar('city_name', { length: 255 }).notNull(),
  
  // District
  districtCode: varchar('district_code', { length: 10 }).notNull(),
  districtName: varchar('district_name', { length: 255 }).notNull(),
  
  // Village
  villageCode: varchar('village_code', { length: 10 }).notNull(),
  villageName: varchar('village_name', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const adBanners = pgTable("ad_banners", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  link: varchar("link").notNull(),
  fileName: varchar("file_name").notNull(),
  filePath: varchar("file_path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adYoutube = pgTable("ad_youtubes", {
  id: serial("id").primaryKey(),
  link: varchar("link").notNull(),
  description: varchar("description").notNull(),
  thumbnail: varchar("thumbnail").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const eventCategoryEnum = pgEnum('event_category', ['Official BKN', 'Event', 'Webinar', 'TO Akbar']);
export const eventCalendar = pgTable("events_calendar", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  dtfrom: timestamp("dtfrom").notNull(),
  dtto: timestamp("dtto").notNull(),
  description: text("description").notNull(),
  eventCategory: eventCategoryEnum("event_category").notNull(),
  eventCategoryColor: varchar("category_color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});