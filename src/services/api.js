// Frontend-only data management
// Mock data for products
const mockProducts = [
  {
    _id: '1',
    title: 'iPhone 13 Pro Max',
    price: 85000,
    description: 'Brand new iPhone 13 Pro Max with 256GB storage. Comes with original box and accessories.',
    category: 'Electronics',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    createdAt: '2024-01-15T10:30:00Z',
    seller: {
      name: 'John Doe',
      verified: true,
      rating: 4.8,
      phone: '+91 98765 43210'
    },
    condition: 'New',
    negotiable: true,
    featured: true
  },
  {
    _id: '2',
    title: 'Honda City 2020',
    price: 1200000,
    description: 'Well maintained Honda City with full service history. Single owner, excellent condition.',
    category: 'Vehicles',
    location: 'Delhi, NCR',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
    createdAt: '2024-01-14T15:45:00Z',
    seller: {
      name: 'Rajesh Kumar',
      verified: true,
      rating: 4.6,
      phone: '+91 98765 43211'
    },
    condition: 'Excellent',
    negotiable: true,
    featured: false
  },
  {
    _id: '3',
    title: 'MacBook Pro M2',
    price: 180000,
    description: 'Latest MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Perfect for professionals.',
    category: 'Electronics',
    location: 'Bangalore, Karnataka',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    createdAt: '2024-01-13T09:20:00Z',
    seller: {
      name: 'Priya Sharma',
      verified: true,
      rating: 4.9,
      phone: '+91 98765 43212'
    },
    condition: 'Like New',
    negotiable: false,
    featured: true
  },
  {
    _id: '4',
    title: 'Gaming Chair',
    price: 15000,
    description: 'Ergonomic gaming chair with lumbar support. Perfect for long gaming sessions.',
    category: 'Furniture',
    location: 'Pune, Maharashtra',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    createdAt: '2024-01-12T14:10:00Z',
    seller: {
      name: 'Amit Patel',
      verified: false,
      rating: 4.3,
      phone: '+91 98765 43213'
    },
    condition: 'Good',
    negotiable: true,
    featured: false
  },
  {
    _id: '5',
    title: 'Sony PlayStation 5',
    price: 55000,
    description: 'Brand new PS5 console with controller and games. Sealed box.',
    category: 'Electronics',
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.pexels.com/photos/4523184/pexels-photo-4523184.jpeg',
    createdAt: '2024-01-11T11:30:00Z',
    seller: {
      name: 'Vikram Singh',
      verified: true,
      rating: 4.7,
      phone: '+91 98765 43214'
    },
    condition: 'New',
    negotiable: false,
    featured: true
  },
  {
    _id: '6',
    title: 'Royal Enfield Classic 350',
    price: 180000,
    description: 'Well maintained Royal Enfield Classic 350. Great condition, ready to ride.',
    category: 'Vehicles',
    location: 'Jaipur, Rajasthan',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    createdAt: '2024-01-10T16:45:00Z',
    seller: {
      name: 'Arjun Mehta',
      verified: true,
      rating: 4.5,
      phone: '+91 98765 43215'
    },
    condition: 'Good',
    negotiable: true,
    featured: false
  },
  {
    _id: '7',
    title: 'Samsung 55" QLED TV',
    price: 75000,
    description: '4K QLED TV with smart features. Excellent picture quality and sound.',
    category: 'Electronics',
    location: 'Hyderabad, Telangana',
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
    createdAt: '2024-01-09T13:20:00Z',
    seller: {
      name: 'Sneha Reddy',
      verified: true,
      rating: 4.8,
      phone: '+91 98765 43216'
    },
    condition: 'Excellent',
    negotiable: true,
    featured: false
  },
  {
    _id: '8',
    title: 'Dining Table Set',
    price: 25000,
    description: '6-seater wooden dining table with chairs. Solid wood construction.',
    category: 'Furniture',
    location: 'Kolkata, West Bengal',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    createdAt: '2024-01-08T10:15:00Z',
    seller: {
      name: 'Ravi Ghosh',
      verified: false,
      rating: 4.2,
      phone: '+91 98765 43217'
    },
    condition: 'Good',
    negotiable: true,
    featured: false
  }
];

// Local storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'olx_products',
  CART: 'olx_cart',
  FAVORITES: 'olx_favorites',
  USER: 'olx_user'
};

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CART)) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
  }
};

// Initialize storage on load
initializeStorage();

// Product API simulation
export const productAPI = {
  getAllProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        resolve({ data: products });
      }, 500);
    });
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        const product = products.find(p => p._id === id);
        if (product) {
          resolve({ data: product });
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },

  createProduct: (productData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
        const newProduct = {
          _id: Date.now().toString(),
          ...productData,
          createdAt: new Date().toISOString(),
          seller: {
            name: 'Current User',
            verified: false,
            rating: 4.0,
            phone: '+91 98765 43210'
          },
          condition: 'Good',
          negotiable: true,
          featured: false
        };
        
        // Handle image as base64 if it's a file
        if (productData.image && typeof productData.image === 'object') {
          // In a real app, you'd upload to a service, here we'll use a placeholder
          newProduct.image = 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg';
        }
        
        products.unshift(newProduct);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        resolve({ data: newProduct });
      }, 1000);
    });
  }
};

// Cart management
export const cartAPI = {
  getCart: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
  },

  addToCart: (product) => {
    const cart = cartAPI.getCart();
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, addedAt: new Date().toISOString() });
    }
    
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    return cart;
  },

  removeFromCart: (productId) => {
    const cart = cartAPI.getCart();
    const updatedCart = cart.filter(item => item._id !== productId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(updatedCart));
    return updatedCart;
  },

  updateQuantity: (productId, quantity) => {
    const cart = cartAPI.getCart();
    const item = cart.find(item => item._id === productId);
    if (item) {
      if (quantity <= 0) {
        return cartAPI.removeFromCart(productId);
      }
      item.quantity = quantity;
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
    return cart;
  },

  clearCart: () => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    return [];
  }
};

// Favorites management
export const favoritesAPI = {
  getFavorites: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
  },

  addToFavorites: (productId) => {
    const favorites = favoritesAPI.getFavorites();
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
    return favorites;
  },

  removeFromFavorites: (productId) => {
    const favorites = favoritesAPI.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== productId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  },

  isFavorite: (productId) => {
    const favorites = favoritesAPI.getFavorites();
    return favorites.includes(productId);
  }
};

// User management (mock)
export const userAPI = {
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null');
  },

  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: '1',
          name: credentials.email.split('@')[0],
          email: credentials.email,
          phone: '+91 98765 43210',
          location: 'Mumbai, Maharashtra',
          joinDate: 'January 2022',
          verified: true
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        resolve({ data: user });
      }, 1000);
    });
  },

  register: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Date.now().toString(),
          ...userData,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          verified: false
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        resolve({ data: user });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export default {
  productAPI,
  cartAPI,
  favoritesAPI,
  userAPI
};