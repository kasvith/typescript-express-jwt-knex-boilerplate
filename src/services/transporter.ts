'use strict';

import config from '../config';
import nodemailer from 'nodemailer';

let transport;

if (config.transporter && config.transporter.smtp) {
  const { host, port, username, password } = config.transporter.smtp;

  transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: username,
      pass: password
    }
  });
}

export default transport;
