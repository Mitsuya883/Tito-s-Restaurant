document.addEventListener('DOMContentLoaded', () => {
    fetch('../api.php') // Asegúrate de que esta ruta sea correcta
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerHTML = `
                    <h2>${product.nombre}</h2>
                    <p>Precio: $${product.precio.toFixed(2)}</p>
                `;
                menuContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));
});
