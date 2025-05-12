document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const resultCount = document.getElementById('resultCount');

    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    const categoryParam = urlParams.get('category');
    const dateParam = urlParams.get('date');

    // Set initial form values from URL parameters
    if (queryParam) searchInput.value = queryParam;
    if (categoryParam) categoryFilter.value = categoryParam;
    if (dateParam) dateFilter.value = dateParam;

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        const category = categoryFilter.value;
        const date = dateFilter.value;

        // Build search URL
        const searchParams = new URLSearchParams();
        if (query) searchParams.set('q', query);
        if (category) searchParams.set('category', category);
        if (date) searchParams.set('date', date);

        // Update URL with search parameters
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);

        // In a real application, you would fetch results from a backend
        // For now, we'll just update the result count
        simulateSearch(query, category, date);
    });

    // Handle filter changes
    [categoryFilter, dateFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            searchForm.dispatchEvent(new Event('submit'));
        });
    });

    function simulateSearch(query, category, date) {
        // Simulate loading state
        document.querySelector('.search-results').style.opacity = '0.6';
        
        setTimeout(() => {
            // In a real application, this would be replaced with actual search results
            const results = document.querySelectorAll('.post-card');
            let visibleResults = 0;

            results.forEach(result => {
                const shouldShow = Math.random() > 0.5;
                result.style.display = shouldShow ? 'block' : 'none';
                if (shouldShow) visibleResults++;
            });

            resultCount.textContent = visibleResults;
            document.querySelector('.search-results').style.opacity = '1';
        }, 500);
    }

    // Initial search if there are URL parameters
    if (queryParam || categoryParam || dateParam) {
        searchForm.dispatchEvent(new Event('submit'));
    }
});
