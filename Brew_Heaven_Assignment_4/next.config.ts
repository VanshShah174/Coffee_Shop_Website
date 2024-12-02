module.exports = {
    async redirects() {
      return [
        {
          source: '/success',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };
  