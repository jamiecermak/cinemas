DO $$ BEGIN
 CREATE TYPE "public"."content_rating" AS ENUM('GENERAL', 'PARENTAL_GUIDANCE', 'MATURE_AUDIENCES', 'MATURE_AUDIENCES_15', 'RESTRICTED_18', 'RESTRICTED_X_18', 'CHECK_THE_CLASSIFICATION', 'REFUSED_CLASSIFICATION', 'NOT_APPLICABLE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movies" (
	"movie_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(1024),
	"content_rating" "content_rating" NOT NULL,
	"runtime_minutes" integer,
	"release_date" timestamp,
	"trailer_url" varchar(256),
	"poster_art_url" varchar(256),
	"is_public" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false,
	"archived_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
