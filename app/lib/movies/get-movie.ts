import { and, eq } from "drizzle-orm";
import { db } from "~/db";
import { movies } from "~/db/schema";

export async function getActiveMovies() {
    const activeMovies = await db.select()
        .from(movies)
        .where(eq(movies.is_archived, false));

    return activeMovies;
}

export async function getPublicMovies() {
    const publicMovies = await db.select()
        .from(movies)
        .where(and(eq(movies.is_public, true), eq(movies.is_archived, false)));

    return publicMovies;
}

export async function getMovieById(movieId: string) {
    const matchedMovies = await db.select()
        .from(movies)
        .where(eq(movies.id, movieId));

    if (matchedMovies.length === 0) {
        return null;
    }

    return matchedMovies[0];
}

export async function getMovieByIdOrThrow(movieId: string) {
    const movie = await getMovieById(movieId);

    if (movie === null) {
        throw new MovieNotFoundError(movieId);
    }

    return movie;
}

export class MovieNotFoundError extends Error {
    constructor(movieId: string) {
        super(`Movie with ID ${movieId} not found`);
    }
}