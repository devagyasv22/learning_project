import express from 'express';

const app = express();  

import userRoutes from './routes/user.routes.js';

app.use(express.json());
app.use('/api/users', userRoutes);  
// example route : http://localhost:8000/api/users/register
export default app;