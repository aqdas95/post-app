import express from 'express';
import bodyParser from 'body-parser';

import errorHandler from './server/utils/error'
import postRoutes from './server/routes/PostRoutes';

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/posts', postRoutes);
// when a random route is inputed
// app.get('*', (req, res) => res.status(404).send({
//   message: 'OOPS :('
// }));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

// app.use(errorHandler)

export default app;