const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe de traer el array de directors', async () => {
    const res = await request(app).get('/directors');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe de crear un obj director', async () => {
    const director = {
        firstName: 'James',
        lastName: 'Camaron',
        nationality: 'Canada',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdoblaje.fandom.com%2Fes%2Fwiki%2FJames_Cameron&psig=AOvVaw1InQe-6z-KGa_6mJWLljuw&ust=1700400371606000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCh4pLTzYIDFQAAAAAdAAAAABAJ',
        birthday: '1954-08-16'
    };
    const res = await request(app).post('/directors').send(director);
    id = res.body.id

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.lastName).toBe(director.lastName);
});

test('PUT /directors/:id debe de actualizar el obj director', async () => {
    const director = {
        lastName: 'Cameron'
    };
    const res = await request(app).put(`/directors/${id}`).send(director);

    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(director.lastName);
});

test('DELETE /directors/:id debe de eliminar el director', async () => {
    const res = await request(app).delete(`/directors/${id}`);

    expect(res.status).toBe(204);
});