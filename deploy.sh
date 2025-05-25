#!/bin/bash

# TikTok Video Manager - Deployment Script
# Hướng dẫn sử dụng: chmod +x deploy.sh && ./deploy.sh

echo "🚀 TikTok Video Manager - Deployment Script"
echo "============================================="

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git branch -M main
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adding and committing changes..."
    git add .
    echo "Enter commit message (or press Enter for default):"
    read commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Update: $(date +'%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_message"
else
    echo "✅ No changes to commit"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Setting up GitHub repository..."
    echo "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git):"
    read repo_url
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
    else
        echo "❌ No repository URL provided. Skipping GitHub push."
        exit 1
    fi
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎯 Deployment Options:"
echo "1. Deploy to Vercel"
echo "2. Deploy to Netlify"
echo "3. Build for Docker"
echo "4. Skip deployment"
echo ""
echo "Enter your choice (1-4):"
read choice

case $choice in
    1)
        echo "🔄 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            vercel --prod
        fi
        ;;
    2)
        echo "🔄 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=.next
        else
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
            netlify login
            netlify deploy --prod --dir=.next
        fi
        ;;
    3)
        echo "🐳 Building Docker image..."
        docker build -t tiktok-video-manager .
        echo "✅ Docker image built successfully!"
        echo "🚀 To run: docker run -p 3000:3000 tiktok-video-manager"
        ;;
    4)
        echo "⏭️  Skipping deployment"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment completed successfully!"
echo "📋 Next steps:"
echo "   - Check your live website"
echo "   - Update DNS settings if using custom domain"
echo "   - Monitor performance and analytics"
echo ""
echo "🔗 Useful links:"
echo "   - GitHub: $(git remote get-url origin)"
echo "   - Documentation: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\([^.]*\).*/\1/')"
