import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "./db/user.js";
import { ProductModel } from "./db/product.js";
import { CategoryModel } from "./db/category.js";
import bcrypt from "bcrypt";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const sampleCategories = [
    {
        name: "Men's Clothing",
        slug: "mens-clothing",
        description: "Stylish and comfortable men's apparel",
        image: "/images/categories/mens-clothing.jpg",
        sortOrder: 1
    },
    {
        name: "Women's Clothing",
        slug: "womens-clothing",
        description: "Fashionable women's clothing and accessories",
        image: "/images/categories/womens-clothing.jpg",
        sortOrder: 2
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "Essential accessories for every style",
        image: "/images/categories/accessories.jpg",
        sortOrder: 3
    },
    {
        name: "Electronics",
        slug: "electronics",
        description: "Latest electronic gadgets and devices",
        image: "/images/categories/electronics.jpg",
        sortOrder: 4
    }
];
const sampleProducts = [
    {
        name: "Classic White T-Shirt",
        description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
        price: 29.99,
        originalPrice: 39.99,
        category: "men",
        subcategory: "shirts",
        brand: "EasyWear",
        images: [
            "/images/products/mens-tshirt-1.jpg",
            "/images/products/mens-tshirt-2.jpg"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Navy"],
        stock: 100,
        isFeatured: true,
        tags: ["casual", "cotton", "basic"],
        rating: {
            average: 4.5,
            count: 25
        },
        specifications: {
            material: "100% Cotton",
            weight: "180gsm",
            careInstructions: "Machine wash cold, tumble dry low"
        }
    },
    {
        name: "Elegant Summer Dress",
        description: "Beautiful floral summer dress perfect for any occasion. Light and airy fabric.",
        price: 79.99,
        originalPrice: 99.99,
        category: "women",
        subcategory: "dresses",
        brand: "EasyWear",
        images: [
            "/images/products/womens-dress-1.jpg",
            "/images/products/womens-dress-2.jpg"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Floral", "Blue", "Pink"],
        stock: 50,
        isFeatured: true,
        tags: ["summer", "floral", "elegant"],
        rating: {
            average: 4.8,
            count: 18
        },
        specifications: {
            material: "Polyester Blend",
            weight: "Lightweight",
            careInstructions: "Hand wash or delicate cycle"
        }
    },
    {
        name: "Premium Jeans",
        description: "High-quality denim jeans with a modern fit. Comfortable and durable.",
        price: 89.99,
        originalPrice: 119.99,
        category: "men",
        subcategory: "pants",
        brand: "EasyWear",
        images: [
            "/images/products/jeans-1.jpg",
            "/images/products/jeans-2.jpg"
        ],
        sizes: ["28", "30", "32", "34", "36", "38", "40"],
        colors: ["Blue", "Black", "Gray"],
        stock: 75,
        isFeatured: false,
        tags: ["denim", "casual", "durable"],
        rating: {
            average: 4.3,
            count: 32
        },
        specifications: {
            material: "98% Cotton, 2% Elastane",
            weight: "Heavyweight Denim",
            careInstructions: "Machine wash cold, hang dry"
        }
    },
    {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and long battery life.",
        price: 199.99,
        originalPrice: 249.99,
        category: "electronics",
        subcategory: "audio",
        brand: "TechSound",
        images: [
            "/images/products/headphones-1.jpg",
            "/images/products/headphones-2.jpg"
        ],
        sizes: [],
        colors: ["Black", "White", "Silver"],
        stock: 30,
        isFeatured: true,
        tags: ["wireless", "noise-cancelling", "premium"],
        rating: {
            average: 4.7,
            count: 45
        },
        specifications: {
            material: "Plastic, Metal",
            weight: "250g",
            careInstructions: "Clean with soft cloth, avoid water"
        }
    }
];
const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
        // Clear existing data
        await CategoryModel.deleteMany({});
        await ProductModel.deleteMany({});
        // Create categories
        const categories = await CategoryModel.insertMany(sampleCategories);
        console.log("Categories created:", categories.length);
        // Create products
        const products = await ProductModel.insertMany(sampleProducts);
        console.log("Products created:", products.length);
        // Create admin user
        const adminExists = await UserModel.findOne({ role: "admin" });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await UserModel.create({
                username: "admin@easyware.com",
                password: hashedPassword,
                firstName: "Admin",
                lastName: "User",
                email: "admin@easyware.com",
                role: "admin"
            });
            console.log("Admin user created");
        }
        console.log("Database seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding database:", error);
    }
    finally {
        await mongoose.disconnect();
    }
};
seedDatabase();
//# sourceMappingURL=seed.js.map