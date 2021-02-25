'use strict';

import config from '../config';
import User from '../models/user.model';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export const jwtStrategy = new Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.sub, (err, user) => {
    if (err) {
      return done(err, null);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
