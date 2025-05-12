// Helper function to get and parse input
function getInputNumbers() {
    const input = document.getElementById('numberInput').value;
    return input.split(',').map(num => Number(num.trim())).filter(num => !isNaN(num));
}

// Helper function to display result
function displayResult(result) {
    document.getElementById('demoResult').textContent = Array.isArray(result) 
        ? result.join(', ') 
        : result;
}

// Demo functions for array methods
function demoMap() {
    const numbers = getInputNumbers();
    const result = numbers.map(num => num * 2);
    displayResult(result);
}

function demoFilter() {
    const numbers = getInputNumbers();
    const result = numbers.filter(num => num % 2 === 0);
    displayResult(result);
}

function demoReduce() {
    const numbers = getInputNumbers();
    const result = numbers.reduce((sum, num) => sum + num, 0);
    displayResult(result);
}

// Add event listener for input validation
document.getElementById('numberInput')?.addEventListener('input', (e) => {
    const value = e.target.value;
    // Allow only numbers, commas, and spaces
    e.target.value = value.replace(/[^0-9,\s]/g, '');
});
