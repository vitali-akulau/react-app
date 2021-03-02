const relativeUrls = {
  checkout: '/checkout',
  collection: (routeName) => `/shop/${routeName}`,
  contact: '/contact',
  search: (searchQuery) => `/search?q=${searchQuery}`,
  shop: '/shop',
  signing: '/signing',
};

module.exports = relativeUrls;
