import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

async function cargarProductos() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const producto = doc.data();
        const productoHTML = `
            <div class="menu-item">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio}</p>
                <p>${producto.descripcion}</p>
                <p>Categoría: ${producto.categoria}</p>
            </div>
        `;
        menuContainer.innerHTML += productoHTML;
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
