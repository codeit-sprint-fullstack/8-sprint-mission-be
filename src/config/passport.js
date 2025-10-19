import passport from 'passport';
import { jwtStrategy } from '../middlewares/passport/jwtStrategy.js';

passport.use('access-token', jwtStrategy);

export default passport;
