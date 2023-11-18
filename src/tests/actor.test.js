const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe retornar un array con los actores creados', async () => {
    const res = await request(app).get('/actors');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un obj actors', async () => {
    const actor = {
        firstName: 'Leo',
        lastName: 'DiCaprio',
        nationality: 'Estados Unidos',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FLeonardo_DiCaprio&psig=AOvVaw0gYJzf-w0K9KdKZ48TrTDM&ust=1700399537266000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCPk4XQzYIDFQAAAAAdAAAAABAE',
        birthday: '1974-11-11'
    }
    const res = await request(app).post('/actors').send(actor)
    id = res.body.id

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);

});

test('PUT /actors/:id debe de actualizar el obj actor', async () => {
    const actor = {
        firstName: 'Leonardo'
    };
    const res = await request(app).put(`/actors/${id}`).send(actor);

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});

test('DELETE /actors/:id debe de eliminar al actor', async () => {
    const res = await request(app).delete(`/actors/${id}`)

    expect(res.status).toBe(204);

});