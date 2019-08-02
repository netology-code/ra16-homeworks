const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

const messages = [];
let nextId = 1;

const router = new Router();

router.get('/messages', async (ctx, next) => {
    const from = Number(ctx.request.query.from)
    if (ctx.request.query.from === 0) {
        ctx.response.body = messages;
        return;
    }

    const fromIndex = messages.findIndex(o => o.id === from);
    if (fromIndex === -1) {
        ctx.response.body = messages;
        return;
    }

    ctx.response.body = messages.slice(fromIndex + 1);
});

router.post('/messages', async(ctx, next) => {
    messages.push({...ctx.request.body, id: nextId++});
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));