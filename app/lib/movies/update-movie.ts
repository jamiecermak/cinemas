import { eq } from "drizzle-orm";
import { db } from "~/db";
import { movies } from "~/db/schema";
import { getMovieByIdOrThrow } from "./get-movie";

export async function updateMovieById(movieId: string, update: Partial<typeof movies.$inferInsert>) {
    const updatedMovie = await db.update(movies)
        .set({
            ...update,
            updated_at: new Date(),
        })
        .where(eq(movies.id, movieId))
        .returning();

    return updatedMovie[0];
}

export async function updateMoviePosterArt(movieId: string, posterArtUrl: string) {
    return updateMovieById(movieId, { poster_art_url: posterArtUrl });
}

export async function updateMovieToPublic(movieId: string) {
    const movie = await getMovieByIdOrThrow(movieId);

    if (movie.is_public) {
        return movie;
    }

    if (movie.runtime_minutes === null) {
        throw new Error("Cannot make movie public without runtime set");
    }

    if (movie.release_date === null) {
        throw new Error("Cannot make movie public without release date set");
    }

    if (movie.poster_art_url === null) {
        throw new Error("Cannot make movie public without poster art URL set");
    }

    return updateMovieById(movie.id, { is_public: true });
}

