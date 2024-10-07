import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
    await page.goto('/');

    expect(await page.title()).toBe('JWT Pizza');
});

test('docs page', async ({ page }) => {
    await page.goto('/docs');
    await expect(page.locator('h2')).toContainText('JWT Pizza');

    await page.goto('/docs/factory');
    await expect(page.locator('h2')).toContainText('JWT Pizza API');
});

test('cancel purchase', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
        const menuRes = [
            { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
            { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: menuRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const franchiseRes = [
            {
                id: 2,
                name: 'LotaPizza',
                stores: [
                    { id: 4, name: 'Lehi' },
                    { id: 5, name: 'Springville' },
                    { id: 6, name: 'American Fork' },
                ],
            },
            { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
            { id: 4, name: 'topSpot', stores: [] },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
    });

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
        const orderReq = {
            items: [
                { menuId: 1, description: 'Veggie', price: 0.0038 },
                { menuId: 2, description: 'Pepperoni', price: 0.0042 },
            ],
            storeId: '4',
            franchiseId: 2,
        };
        const orderRes = {
            order: {
                items: [
                    { menuId: 1, description: 'Veggie', price: 0.0038 },
                    { menuId: 2, description: 'Pepperoni', price: 0.0042 },
                ],
                storeId: '4',
                franchiseId: 2,
                id: 23,
            },
            jwt: 'eyJpYXQ',
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(orderReq);
        await route.fulfill({ json: orderRes });
    });

    await page.goto('/');

    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();

    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    // Pay
    await expect(page.getByRole('main')).toContainText('Send me that pizza right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tfoot')).toContainText('0.004 ₿');
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.locator('h2')).toContainText('Awesome is a click away');
});

test('error purchase', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
        const menuRes = [
            { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
            { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: menuRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const franchiseRes = [
            {
                id: 2,
                name: 'LotaPizza',
                stores: [
                    { id: 4, name: 'Lehi' },
                    { id: 5, name: 'Springville' },
                    { id: 6, name: 'American Fork' },
                ],
            },
            { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
            { id: 4, name: 'topSpot', stores: [] },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
    });

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
        await route.fulfill({status: 404})
    });

    await page.goto('/');

    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();

    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();

    await expect(page.locator('h2')).toContainText('So worth it');
});

test('purchase with login', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
        const menuRes = [
            { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
            { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: menuRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        const franchiseRes = [
            {
                id: 2,
                name: 'LotaPizza',
                stores: [
                    { id: 4, name: 'Lehi' },
                    { id: 5, name: 'Springville' },
                    { id: 6, name: 'American Fork' },
                ],
            },
            { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
            { id: 4, name: 'topSpot', stores: [] },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
    });

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
        const orderReq = {
            items: [
                { menuId: 1, description: 'Veggie', price: 0.0038 },
                { menuId: 2, description: 'Pepperoni', price: 0.0042 },
            ],
            storeId: '4',
            franchiseId: 2,
        };
        const orderRes = {
            order: {
                items: [
                    { menuId: 1, description: 'Veggie', price: 0.0038 },
                    { menuId: 2, description: 'Pepperoni', price: 0.0042 },
                ],
                storeId: '4',
                franchiseId: 2,
                id: 23,
            },
            jwt: 'eyJpYXQ',
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(orderReq);
        await route.fulfill({ json: orderRes });
    });
    
    await page.route('*/**/api/order/verify', async (route) => {
        const menuRes = [{
            "vendor": {
              "id": "jwt-headquarters",
              "name": "JWT Headquarters"
            },
            "diner": {
              "id": 309,
              "name": "Jaquelyn Guernsey",
              "email": "guernjaq000@gmail.com"
            },
            "order": {
              "items": [
                {
                  "menuId": 1,
                  "description": "Veggie",
                  "price": 0.0038
                },
                {
                  "menuId": 2,
                  "description": "Pepperoni",
                  "price": 0.0042
                }
              ],
              "storeId": "5",
              "franchiseId": 2,
              "id": 821
            }
          }];
        expect(route.request().method()).toBe('POST');
        await route.fulfill({ json: menuRes });
    });

    await page.goto('/');

    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();

    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();

    // Check balance
    await expect(page.getByText('0.008')).toBeVisible();

    await page.getByRole('button', { name: 'Verify' }).click();
});

test('logout', async ({page}) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        await route.fulfill({ json: loginRes });
    });

    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();

    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('header')).toContainText('KC');
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page.locator('header')).toContainText('Login');
});

test('register', async ({page}) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('POST');
        await route.fulfill({ json: loginRes });
    });

    await page.goto('/');
    await page.getByRole('link', { name: 'Register' }).click();

    // Register
    await page.getByPlaceholder('Full Name').click();
    await page.getByPlaceholder('Full Name').fill('Kai Chen');
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('header')).toContainText('KC');
});

test('diner dashboard with orders', async ({page}) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/order', async (route) => {
        const orderRes = { dinerId: 4, orders: [{ id: 1, franchiseId: 1, storeId: 1, date: '2024-06-05T05:14:40.000Z', items: [{ id: 1, menuId: 1, description: 'Veggie', price: 0.05 }] }], page: 1 }
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: orderRes });
    });

    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();

    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('header')).toContainText('KC');
    await page.getByRole('link', { name: 'KC' }).click();
    
    await expect(page.locator('main')).toContainText('Your pizza kitchen');
});

test('franchise logged out', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Franchise' }).first().click();
    await expect(page.locator('main')).toContainText('So you want a piece of the pie?');
});

test('about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.locator('main')).toContainText('The secret sauce');
});

test('history page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page.locator('main')).toContainText('Mama Rucci, my my');
});

test('404 page', async ({ page }) => {
    await page.goto('/notexist');
    await expect(page.locator('main')).toContainText('Oops');
});