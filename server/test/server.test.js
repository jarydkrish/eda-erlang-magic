let testServer = require('supertest')

let app = require('../server')

describe('Test the root path', () => {
  test('It should respond 200 the LOGOUT route', async () => {
    const response = await testServer(app).post('/api/user/logout');
    expect(response.statusCode).toBe(200);
  });

  test('It should protect the /USER route', async () => {
    const response = await testServer(app).get('/api/user');
    expect(response.statusCode).toBe(403);
  });

  // your db must have a user made that you are testing!
  // agent allows us to reuse cookies!
  test('/user route should return user info when authenticated', async () => {
    let agent = testServer.agent(app);
    await agent.post('/api/user/register')
               .send({username: 'dane', password: '1234'});

    const response = await agent
                            .post('/api/user/login')
                            .send({username: 'dane', password: '1234'});
    expect(response.statusCode).toBe(200);

    const userResponse = await agent.get('/api/user');
    expect(userResponse.statusCode).toBe(200);
    console.log('here is userResponse', userResponse.body)
  });
})
