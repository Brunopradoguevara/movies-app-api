const request = require('supertest');
const app = require('../app');

let id;


test('GET /genres debe de retornar un array de genres', async () => {
    const res = await request(app).get('/genres');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe de crear un obj genres', async () => {
    const genre = {
        name: 'Acción'
    };
    res = await request(app).post('/genres').send(genre);
    id = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/:id debe de actualizar el obj genre', async () => {
    const genre = {
        name: "Aventura"
    };
    const res = await request(app).put(`/genres/${id}`).send(genre);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/:id debe de eliminar el genre ', async () => {
    const res = await request(app).delete(`/genres/${id}`);

    expect(res.status).toBe(204);
});