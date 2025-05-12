document.addEventListener('DOMContentLoaded', () => {
    // Blog post data
    const blogPosts = {
        'getting-started': {
            title: 'Getting Started with Web Development',
            excerpt: `Web development is an exciting journey that combines creativity with technical skills. 
            In this comprehensive guide, we'll explore the fundamental concepts, tools, and technologies 
            that form the foundation of modern web development.

            Key Topics:
            • HTML5 fundamentals and semantic markup
            • CSS3 styling and responsive design
            • JavaScript basics and DOM manipulation
            • Version control with Git
            • Modern development tools and workflows`,
            author: 'John Smith',
            date: 'May 11, 2025',
            readTime: '10 min read',
            category: 'Tutorial'
        },
        'css-layouts': {
            title: 'CSS Grid vs Flexbox: When to Use What',
            excerpt: `Understanding the differences between CSS Grid and Flexbox is crucial for modern web development. 
            This guide explores the strengths and use cases of each layout system.

            Key Topics:
            • One-dimensional vs two-dimensional layouts
            • Flexbox for component design
            • Grid for page layouts
            • Real-world use cases
            • Best practices and tips`,
            author: 'Mike Chen',
            date: 'May 10, 2025',
            readTime: '8 min read',
            category: 'Tutorial'
        },
        'js-best-practices': {
            title: '10 JavaScript Best Practices Every Developer Should Know',
            excerpt: `Writing clean, maintainable JavaScript code is essential for successful web development. 
            Learn the best practices that will improve your code quality and development workflow.

            Key Topics:
            • Modern JavaScript features
            • Code organization patterns
            • Error handling strategies
            • Performance optimization
            • Testing and debugging`,
            author: 'Sarah Johnson',
            date: 'May 9, 2025',
            readTime: '12 min read',
            category: 'Tips'
        }
    };

    // Create modal HTML
    const modalHTML = `
        <div class="preview-modal" id="previewModal">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close preview">×</button>
                <div class="modal-header">
                    <span class="modal-category"></span>
                    <h2 class="modal-title"></h2>
                    <div class="modal-meta">
                        <span class="modal-author"></span>
                        <span class="modal-date"></span>
                        <span class="modal-read-time"></span>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-excerpt"></div>
                    <div class="modal-actions">
                        <a href="#" class="btn primary-btn read-full">Read Full Article</a>
                        <button class="btn secondary-btn modal-close-btn">Close Preview</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.getElementById('previewModal');
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
    
    // Handle read more clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const postUrl = e.target.href;
            const postId = postUrl.split('/').pop().replace('.html', '');
            const post = blogPosts[postId];
            
            if (post) {
                showPreview(post, postUrl);
            } else {
                window.location.href = postUrl;
            }
        }
    });

    // Show preview modal
    function showPreview(post, url) {
        modal.querySelector('.modal-category').textContent = post.category;
        modal.querySelector('.modal-title').textContent = post.title;
        modal.querySelector('.modal-author').textContent = post.author;
        modal.querySelector('.modal-date').textContent = post.date;
        modal.querySelector('.modal-read-time').textContent = post.readTime;
        modal.querySelector('.modal-excerpt').textContent = post.excerpt;
        modal.querySelector('.read-full').href = url;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
