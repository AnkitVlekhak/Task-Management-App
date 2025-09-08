#!/bin/bash

echo "🚀 Setting up Task Management App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if MongoDB is running (optional)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. Make sure to set up MongoDB Atlas or install MongoDB locally."
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..

echo "✅ Dependencies installed successfully!"

# Create .env file if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating .env file..."
    cp server/env.example server/.env
    echo "⚠️  Please update server/.env with your MongoDB URI and JWT secret"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development servers:"
echo "  npm run dev"
echo ""
echo "To start individual services:"
echo "  npm run server  # Backend only"
echo "  npm run client  # Frontend only"
echo ""
echo "Don't forget to:"
echo "1. Update server/.env with your MongoDB connection string"
echo "2. Set a secure JWT secret in server/.env"
echo "3. Make sure MongoDB is running or use MongoDB Atlas"
