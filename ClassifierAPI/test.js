const fetch = require('node-fetch');
const app = require('./index');

describe('post /v1/category', () => {
  it('should classify category', async () => {
    const categoryResponse = await fetch('http://localhost:3001/v1/category', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify([
        'How ARM Nerfed NEON Permute Instructions in ARMv8',
        'Libya migrant auctions',
        'How a Trove of Nazi Art Wound Up Under Lock and Key on an Army Base in Virginia',
        'Cloudron 1.8 released – Docker upgrade, restrict app access to users',
        'Quotes you should live by',
      ]),
    });
    const categories = await categoryResponse.json();

    expect(categoryResponse.status).toBe(200);
    expect(Array.isArray(categories)).toBe(true);
    expect((categories).length).toBe(5);

    for (const category of categories) {
      expect(typeof category).toBe('string');
    }
  });

  it('should handle invalid input', async () => {
    let categoryResponse = await fetch('http://localhost:3001/v1/category', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(['How ARM Nerfed NEON Permute Instructions in ARMv8', 134245]),
    });

    expect(categoryResponse.status).toBe(400);
    expect(await categoryResponse.json()).toBe('Invalid input');

    categoryResponse = await fetch('http://localhost:3001/v1/category', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title1: 'How ARM Nerfed NEON Permute Instructions in ARMv8', title2: 'Libya migrant auctions' }),
    });

    expect(categoryResponse.status).toBe(400);
    expect(await categoryResponse.json()).toBe('Invalid input');
  });

  it('should handle wrong request method', async () => {
    const categoryResponse = await fetch('http://localhost:3001/v1/category', { method: 'get' });

    expect(categoryResponse.status).toBe(404);
  });

  it('should handle wrong URL', async () => {
    const categoryResponse = await fetch('http://localhost:3001/v1/dasqwe', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(['How ARM Nerfed NEON Permute Instructions in ARMv8', 'Libya migrant auctions']),
    });

    expect(categoryResponse.status).toBe(404);
  });
});
