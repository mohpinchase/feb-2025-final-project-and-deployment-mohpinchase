document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.post-card');

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get selected category
            const selectedCategory = button.dataset.category;
            
            // Filter posts
            filterPosts(selectedCategory);
        });
    });

    function filterPosts(category) {
        posts.forEach(post => {
            // Get post category
            const postCategory = post.dataset.category;
            
            // Show/hide posts based on category
            if (category === 'all' || postCategory === category) {
                post.style.display = '';
                // Add fade-in animation
                post.style.opacity = '0';
                requestAnimationFrame(() => {
                    post.style.transition = 'opacity 0.3s ease';
                    post.style.opacity = '1';
                });
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Count posts in each category
    function updateCategoryCounts() {
        const counts = {
            all: posts.length,
            tutorials: 0,
            tips: 0,
            news: 0
        };

        posts.forEach(post => {
            const category = post.dataset.category;
            if (counts.hasOwnProperty(category)) {
                counts[category]++;
            }
        });

        // Update button text with counts
        filterButtons.forEach(button => {
            const category = button.dataset.category;
            if (counts.hasOwnProperty(category)) {
                button.innerHTML = `${button.textContent.split('(')[0]} (${counts[category]})`;
            }
        });
    }

    // Initialize category counts
    updateCategoryCounts();
});
