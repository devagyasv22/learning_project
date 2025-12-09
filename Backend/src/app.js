import express from 'express';

const app = express();  
app.use(express.json());

import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);  
// example route : http://localhost:8000/api/users/register
export default app;