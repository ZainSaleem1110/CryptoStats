const config = {
  development: {
    apiURI: 'https://clstr-app.herokuapp.com/',
    chainId: 4,
    availableWallets: ['metamask'],
  },
  production: {
    apiURI: 'https://clstr-app.herokuapp.com/',
    chainId: 4,
    availableWallets: ['metamask'],
  },
};

export default config['development'];
