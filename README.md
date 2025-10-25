# EasyWare - Full-Stack E-Commerce Platform

A modern, full-stack e-commerce platform built with React, TypeScript, Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart, order processing, and admin dashboard.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Authentication**: User registration, login, and profile management
- **Product Catalog**: Browse products with filtering and search
- **Shopping Cart**: Add/remove items with persistent cart state
- **Order Management**: Complete checkout process
- **Admin Dashboard**: Product management, user management, order tracking

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete API with authentication middleware
- **User Management**: Registration, login, profile updates
- **Product Management**: CRUD operations with categories and reviews
- **Order Processing**: Order creation, tracking, and management
- **Cart Management**: Persistent shopping cart functionality
- **Admin Features**: User management, order statistics, product management

### Database Schema
- **Users**: Authentication, profiles, addresses, preferences
- **Products**: Categories, reviews, inventory, specifications
- **Orders**: Order tracking, payment status, shipping information
- **Cart**: Session-based shopping cart management

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router
- React Query (TanStack Query)

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Zod for validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or pnpm

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/easyware
   JWT_SECRET=your-super-secret-jwt-key
   ADMIN_KEY=your-admin-secret-key
   PORT=8080
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Build and run the backend**
   ```bash
   npm run build
   npm start
   # or for development
   npm run dev
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd stitch-showcase-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## 🔧 Configuration

### Backend Configuration

The backend uses the following environment variables:

- `MONGO_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `ADMIN_KEY`: Secret key for admin user creation
- `PORT`: Server port (default: 8080)
- `CORS_ORIGIN`: Frontend URL for CORS

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8080/api/v1`. Update the API base URL in `src/services/api.ts` if your backend runs on a different port.

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Product Endpoints
- `GET /api/v1/products` - Get all products (with filtering)
- `GET /api/v1/products/:id` - Get single product
- `GET /api/v1/products/featured/list` - Get featured products
- `POST /api/v1/products` - Create product (Admin)
- `PUT /api/v1/products/:id` - Update product (Admin)
- `DELETE /api/v1/products/:id` - Delete product (Admin)

### Cart Endpoints
- `GET /api/v1/cart` - Get user's cart
- `POST /api/v1/cart/add` - Add item to cart
- `PUT /api/v1/cart/update` - Update cart item
- `DELETE /api/v1/cart/remove` - Remove item from cart
- `DELETE /api/v1/cart/clear` - Clear entire cart

### Order Endpoints
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/my-orders` - Get user's orders
- `GET /api/v1/orders/:id` - Get single order

### Admin Endpoints
- `GET /api/v1/user/admin/users` - Get all users
- `GET /api/v1/orders/admin/all` - Get all orders
- `PATCH /api/v1/orders/:id/status` - Update order status
- `GET /api/v1/user/admin/stats` - Get user statistics
- `GET /api/v1/orders/admin/stats` - Get order statistics

## 🎯 Usage

### Default Admin Account
After seeding the database, you can login with:
- Email: `admin@easyware.com`
- Password: `admin123`

### Creating Products
1. Login as admin
2. Navigate to Admin Dashboard
3. Go to Products tab
4. Click "Add Product"
5. Fill in product details

### User Registration
1. Navigate to Sign Up page
2. Fill in user details
3. Account will be created automatically

### Shopping Flow
1. Browse products on the homepage or category pages
2. Add items to cart
3. Review cart and proceed to checkout
4. Fill in shipping and billing information
5. Complete the order

## 🚀 Deployment

### Backend Deployment
1. Build the project: `npm run build`
2. Set up environment variables on your hosting platform
3. Deploy the `dist` folder to your server

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)
3. Update the API base URL in production

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGO_URL` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@easyware.com or create an issue in the repository.

## 🔄 Version History

- v1.0.0 - Initial release with core e-commerce functionality
- Authentication and user management
- Product catalog and management
- Shopping cart and checkout
- Admin dashboard
- Order management system
