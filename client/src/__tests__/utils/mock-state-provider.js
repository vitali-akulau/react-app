const stateMocked = {
  cart: {
    hidden: true,
    cartItems: [
      {
        id: 234,
        imageUrl: 'https://www.product-item-image.com/smth.jpeg',
        name: 'Levi\'s 512',
        price: 50,
        quantity: 4,
      },
      {
        id: 14,
        imageUrl: 'https://www.product-item-image.com/smth-1.jpeg',
        name: 'Nike Air Max 90',
        price: 150,
        quantity: 2,
      },
      {
        id: 67,
        imageUrl: 'https://www.product-item-image.com/smth-2.jpeg',
        name: 'Jack Wolfskin Red River Shirt',
        price: 40,
        quantity: 1,
      },
    ],
  },
  directory: {
    sections: [
      {
        title: 'hats', imageUrl: 'https://i.ibb.co/cvpntL1/hats.png', id: 1, linkUrl: 'shop/hats',
      },
      {
        title: 'jackets', imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png', id: 2, linkUrl: 'shop/jackets',
      },
      {
        title: 'sneakers', imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png', id: 3, linkUrl: 'shop/sneakers',
      },
      {
        title: 'womens', imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png', size: 'large', id: 4, linkUrl: 'shop/womens',
      },
      {
        title: 'mens', imageUrl: 'https://i.ibb.co/R70vBrQ/men.png', size: 'large', id: 5, linkUrl: 'shop/mens',
      },
    ],
  },
  search: {
    errorMessage: null,
    isFetching: false,
    query: 'Hat',
    products: [
      {
        id: 5, imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png', name: 'Green Beanie Hat', price: 18,
      },
      {
        id: 4, imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png', name: 'Grey Brim Hat', price: 25,
      },
      {
        id: 6, imageUrl: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png', name: 'Palm Tree Cap Hat', price: 14,
      },
      {
        id: 7, imageUrl: 'https://i.ibb.co/bLB646Z/red-beanie.png', name: 'Red Beanie Hat', price: 18,
      },
      {
        id: 8, imageUrl: 'https://i.ibb.co/1f2nWMM/wolf-cap.png', name: 'Wolf Cap Hat', price: 14,
      },
    ],
  },
  shop: {
    errorMessage: null,
    isFetching: false,
    collections: {
      hats: {
        id: 'OUZXkEaW1dTugEW0673i',
        routeName: 'hats',
        title: 'Hats',
        items: [
          {
            id: 1, imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png', name: 'Brown Brim', price: 25,
          },
          {
            id: 2, imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png', name: 'Blue Beanie', price: 18,
          },
          {
            id: 3, imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png', name: 'Brown Cowboy', price: 35,
          },
          {
            id: 4, imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png', name: 'Grey Brim', price: 25,
          },
          {
            id: 5, imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png', name: 'Green Beanie', price: 18,
          },
          {
            id: 6, imageUrl: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png', name: 'Palm Tree Cap', price: 14,
          },
          {
            id: 7, imageUrl: 'https://i.ibb.co/bLB646Z/red-beanie.png', name: 'Red Beanie', price: 18,
          },
          {
            id: 8, imageUrl: 'https://i.ibb.co/1f2nWMM/wolf-cap.png', name: 'Wolf Cap', price: 14,
          },
          {
            id: 9, imageUrl: 'https://i.ibb.co/X2VJP2W/blue-snapback.png', name: 'Blue Snapback', price: 16,
          },
        ],
      },
      jackets: {
        id: 'ydqp65N0ACW5g1qwfqgu',
        routeName: 'jackets',
        title: 'Jackets',
        items: [
          {
            id: 18, imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png', name: 'Black Jean Shearling', price: 125,
          },
          {
            id: 19, imageUrl: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png', name: 'Blue Jean Jacket', price: 90,
          },
          {
            id: 20, imageUrl: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png', name: 'Grey Jean Jacket', price: 90,
          },
          {
            id: 21, imageUrl: 'https://i.ibb.co/s96FpdP/brown-shearling.png', name: 'Brown Shearling', price: 165,
          },
          {
            id: 22, imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png', name: 'Tan Trench', price: 185,
          },
        ],
      },
      mens: {
        id: 'CNxLqIcH6K7GAVbjWlVc',
        routeName: 'mens',
        title: 'Mens',
        items: [
          {
            id: 30, imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png', name: 'Camo Down Vest', price: 325,
          },
          {
            id: 31, imageUrl: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png', name: 'Floral T-shirt', price: 20,
          },
          {
            id: 32, imageUrl: 'https://i.ibb.co/55z32tw/long-sleeve.png', name: 'Black & White Longsleeve', price: 25,
          },
          {
            id: 33, imageUrl: 'https://i.ibb.co/RvwnBL8/pink-shirt.png', name: 'Pink T-shirt', price: 25,
          },
          {
            id: 34, imageUrl: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png', name: 'Jean Long Sleeve', price: 40,
          },
          {
            id: 35, imageUrl: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png', name: 'Burgundy T-shirt', price: 25,
          },
        ],
      },
      sneakers: {
        id: 'FWCoaBgWKTtsJs34HkyW',
        routeName: 'sneakers',
        title: 'Sneakers',
        items: [
          {
            id: 10, imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png', name: 'Adidas NMD', price: 220,
          },
          {
            id: 11, imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png', name: 'Adidas Yeezy', price: 280,
          },
          {
            id: 12, imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png', name: 'Black Converse', price: 110,
          },
          {
            id: 13, imageUrl: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png', name: 'Nike White AirForce', price: 160,
          },
          {
            id: 14, imageUrl: 'https://i.ibb.co/QcvzydB/nikes-red.png', name: 'Nike Red High Tops', price: 160,
          },
          {
            id: 15, imageUrl: 'https://i.ibb.co/fMTV342/nike-brown.png', name: 'Nike Brown High Tops', price: 160,
          },
          {
            id: 16, imageUrl: 'https://i.ibb.co/w4k6Ws9/nike-funky.png', name: 'Air Jordan Limited', price: 190,
          },
          {
            id: 17, imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png', name: 'Timberlands', price: 200,
          },
        ],
      },
      womens: {
        id: 'epCsDwzGwTZRBxyHJSWA',
        routeName: 'womens',
        title: 'Womens',
        items: [
          {
            id: 23, imageUrl: 'https://i.ibb.co/7CQVJNm/blue-tank.png', name: 'Blue Tanktop', price: 25,
          },
          {
            id: 24, imageUrl: 'https://i.ibb.co/4W2DGKm/floral-blouse.png', name: 'Floral Blouse', price: 20,
          },
          {
            id: 25, imageUrl: 'https://i.ibb.co/KV18Ysr/floral-skirt.png', name: 'Floral Dress', price: 80,
          },
          {
            id: 26, imageUrl: 'https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png', name: 'Red Dots Dress', price: 80,
          },
          {
            id: 27, imageUrl: 'https://i.ibb.co/KmSkMbH/striped-sweater.png', name: 'Striped Sweater', price: 45,
          },
          {
            id: 28, imageUrl: 'https://i.ibb.co/v1cvwNf/yellow-track-suit.png', name: 'Yellow Track Suit', price: 135,
          },
          {
            id: 29, imageUrl: 'https://i.ibb.co/qBcrsJg/white-vest.png', name: 'White Blouse', price: 20,
          },
        ],
      },
    },
  },
  user: {
    currentUser: null,
    errorMessage: null,
  },
};
