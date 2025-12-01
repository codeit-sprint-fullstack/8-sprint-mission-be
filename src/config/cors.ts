import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:3000', 'https://codeit-sprint-mission.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

export default cors(corsOptions);
