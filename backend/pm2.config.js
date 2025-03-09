module.exports = {
  apps: [
    {
      name: 'big-black-status-backend',
      script: 'dist/src/main.js',
      instance: -1,
      exec_mode: 'cluster',
    },
  ],
};
