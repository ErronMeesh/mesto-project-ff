const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ({ env }) => ({
  plugins: [
    autoprefixer,
    env === 'production' ? cssnano({ preset: 'default' }) : null,
  ].filter(Boolean),
});