const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies debe de retornar un array de movies', async () => {
    const res = await request(app).get('/movies');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe de crear un obj movies', async () => {
    const movie = {
        name:'Titan',
        image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elespanol.com%2Fseries%2Fcine%2F20171202%2F266473575_0.html&psig=AOvVaw1t5Vs9jZUgdcjnfhc-Ools&ust=1700402411438000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCPvN_azYIDFQAAAAAdAAAAABAY',
        synopsis:'Una joven de la alta sociedad abandona a su arrogante pretendiente por un artista humilde en el trasatlántico que se hundió durante su viaje inaugural.',
        releaseYear:1997
    };
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe de actualizar el obj movie', async () => {
    const movie = {
        name: 'Titanic'
    };
    const res = await request(app).put(`/movies/${id}`).send(movie);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors debe de agregar actors a movie', async () => {
    const actor = await Actor.create({
        firstName: 'Leo',
        lastName: 'DiCaprio',
        nationality: 'Estados Unidos',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FLeonardo_DiCaprio&psig=AOvVaw0gYJzf-w0K9KdKZ48TrTDM&ust=1700399537266000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCPk4XQzYIDFQAAAAAdAAAAABAE',
        birthday: '1974-11-11'
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debde de agregar directors a movie', async () => {
    const director = await Director.create({
        firstName: 'James',
        lastName: 'Camaron',
        nationality: 'Canada',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdoblaje.fandom.com%2Fes%2Fwiki%2FJames_Cameron&psig=AOvVaw1InQe-6z-KGa_6mJWLljuw&ust=1700400371606000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCh4pLTzYIDFQAAAAAdAAAAABAJ',
        birthday: '1954-08-16'
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres debe de agregar genres a movie', async () => {
    const genre = await Genre.create({
        name: 'Acción'
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe de elimiar la movie', async () => {
    const res = await request(app).delete(`/movies/${id}`);

    expect(res.status).toBe(204);
});