import { integer, pgEnum, pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { ContentRating } from './constants';

export const contentRatingEnum = pgEnum('content_rating', [
    ContentRating.GENERAL,
    ContentRating.PARENTAL_GUIDANCE,
    ContentRating.MATURE_AUDIENCES,
    ContentRating.MATURE_AUDIENCES_15,
    ContentRating.RESTRICTED_18,
    ContentRating.RESTRICTED_X_18,
    ContentRating.CHECK_THE_CLASSIFICATION,
    ContentRating.REFUSED_CLASSIFICATION,
    ContentRating.NOT_APPLICABLE,
]);

export const movies = pgTable('movies', {
    id: uuid('movie_id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: varchar('description', { length: 1024}),
    rating: contentRatingEnum('content_rating').notNull(),
    runtime_minutes: integer('runtime_minutes'),
    release_date: timestamp('release_date'),
    trailer_url: varchar('trailer_url', { length: 256 }),
    poster_art_url: varchar('poster_art_url', { length: 256 }),
    is_public: boolean('is_public').default(false),
    is_archived: boolean('is_archived').default(false),
    archived_at: timestamp('archived_at'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});