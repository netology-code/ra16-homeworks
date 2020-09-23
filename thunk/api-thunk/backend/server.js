const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();
app.use(cors());
app.use(koaBody({ json: true }));

let nextId = 1;
const services = [
    { id: nextId++, name: 'Замена стекла', price: 21000, content: 'Стекло оригинал от Apple'},
    { id: nextId++, name: 'Замена дисплея', price: 25000, content: 'Дисплей оригинал от Foxconn'},
    { id: nextId++, name: 'Замена аккумулятора', price: 4000, content: 'Новый на 4000 mAh'},
    { id: nextId++, name: 'Замена микрофона', price: 2500, content: 'Оригинальный от Apple'},
];

const router = new Router();

function fortune(ctx, body = null, status = 200) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.25) {
                ctx.response.status = status;
                ctx.response.body = body;
                resolve();
                return;
            }

            reject(new Error('Something bad happened'));
        }, 3 * 1000);
    })
}

router.get('/api/services', async (ctx, next) => {
    const body = services.map(o => ({id: o.id, name: o.name, price: o.price}))
    return fortune(ctx, body);
});
router.get('/api/services/:id', async (ctx, next) => {
    const id = Number(ctx.params.id);
    const index = services.findIndex(o => o.id === id);
    if (index === -1) {
        const status = 404;
        return fortune(ctx, null, status);
    }
    const body = services[index];
    return fortune(ctx, body);
});
router.post('/api/services', async (ctx, next) => {
    const id = ctx.request.body.id;
    if (id !== 0) {
        const index = services.findIndex(o => o.id === id);
        if (index === -1) {
            const status = 404;
            return fortune(ctx, null, status);
        }
        services[index] = ctx.request.body;
        return fortune(ctx, null, 204);
    }
    
    services.push({ ...ctx.request.body, id: nextId++ });
    const status = 204;
    return fortune(ctx, null, status);
});
router.delete('/api/services/:id', async (ctx, next) => {
    const id = Number(ctx.params.id);
    const index = services.findIndex(o => o.id === id);
    if (index === -1) {
        const status = 404;
        return fortune(ctx, null, status);
    }
    services.splice(index, 1);
    const status = 204;
    return fortune(ctx, null, status);
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
