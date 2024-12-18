  // Cargar los productos desde la API
function cargarProductos() {
    fetch('http://localhost:3000/productos')
      .then(response => response.json())
      .then(data => {
        const menu = document.getElementById('menu');
        menu.innerHTML = ''; // Limpiar lista actual
        data.forEach(producto => {
          const li = document.createElement('li');
          li.innerHTML = `${producto.nombre} - ${producto.descripcion} - $${producto.precio} 
                          <button onclick="eliminarProducto(${producto.id})">Eliminar</button>`;
          menu.appendChild(li);
        });
      })
      .catch(error => console.error('Error al cargar los productos:', error));
  }
  
  // Agregar un nuevo producto
  const formAgregar = document.getElementById('form-agregar');
  formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
  
    fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, descripcion, precio })
    })
    .then(response => response.json())
    .then(data => {
      alert('Producto agregado');
      cargarProductos(); // Recargar la lista de productos
    })
    .catch(error => console.error('Error al agregar el producto:', error));
  });
  
  // Eliminar un producto
  function eliminarProducto(id) {
    fetch(`http://localhost:3000/productos/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      cargarProductos(); // Recargar la lista de productos
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
  }
  
  // Cargar los productos al inicio
  cargarProductos();
  