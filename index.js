document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');
    const searchInput = document.getElementById('search');
    const apiUrl = 'https://api.coincap.io/v2/assets';

    // Fetch cryptocurrency data
    async function fetchCryptos() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const cryptos = data.data.slice(0, 5); // Get first 5 cryptocurrencies
            displayCryptos(cryptos);
        } catch (error) {
            console.error('Error fetching cryptocurrency data:', error);
        }
    }

    // Display cryptocurrency data
    function displayCryptos(cryptos) {
        main.innerHTML = '';
        cryptos.forEach(crypto => {
            const cryptoItem = document.createElement('div');
            cryptoItem.classList.add('crypto-item');
            cryptoItem.innerHTML = `
                <div class="crypto-name">${crypto.name}</div>
                <div class="crypto-symbol">${crypto.symbol}</div>
                <div class="crypto-price">$${parseFloat(crypto.priceUsd).toFixed(2)}</div>
                <div class="crypto-change ${crypto.changePercent24Hr < 0 ? 'negative' : ''}">${parseFloat(crypto.changePercent24Hr).toFixed(2)}%</div>
            `;
            main.appendChild(cryptoItem);
        });
    }

    // Handle search input
    function handleSearch() {
        const query = searchInput.value.toLowerCase();
        const cryptoItems = document.querySelectorAll('.crypto-item');
        cryptoItems.forEach(item => {
            const cryptoName = item.querySelector('.crypto-name').textContent.toLowerCase();
            const cryptoSymbol = item.querySelector('.crypto-symbol').textContent.toLowerCase();
            if (cryptoName.includes(query) || cryptoSymbol.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Event listeners
    fetchCryptos(); // Fetch cryptocurrencies on page load
    searchInput.addEventListener('input', handleSearch); // Filter cryptocurrencies based on search input

    // Click event listener
    main.addEventListener('click', (event) => {
        if (event.target.classList.contains('crypto-item')) {
            // Handle click on cryptocurrency item
            console.log('Clicked on cryptocurrency item:', event.target);
        }
    });

    // Change event listener
    searchInput.addEventListener('change', () => {
        // Handle change in search input
        console.log('Search input changed:', searchInput.value);
    });
});
