export default () => ({
    expiresIn: '2000s',
  jwtToken: process.env.JWT_TOKEN || '12345678',
});
