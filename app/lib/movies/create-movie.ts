import { db } from "~/db";
import { movies } from "~/db/schema";

type NewMovie = Pick<typeof movies.$inferInsert, 'name' | 'description' | 'rating' | 'runtime_minutes' | 'release_date' | 'trailer_url'>;

export async function createMovie(movie: NewMovie) {
    const newMovie = await db.insert(movies).values({
        ...movie,
        is_public: false,
        is_archived: false,
    }).returning()

    return newMovie[0];
}