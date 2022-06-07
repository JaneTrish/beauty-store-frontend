require('express-async-errors');
//express
const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//routers
const productsRouter = require('./routes/productsRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

//middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ['https://beaty-store.herokuapp.com', 'http://localhost:3000'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
    ],
  })
);
app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('<h1>Beauty Store API</h1><a href="/api-docs">Documentation</a>');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//routes
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
