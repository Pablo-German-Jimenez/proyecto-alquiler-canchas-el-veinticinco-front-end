import Swal from "sweetalert2";

const URL_PRODUCTOS = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/products` 
  : "http://localhost:3001/api/products";

const URL_USUARIOS = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/usuarios` 
  : "http://localhost:3001/api/usuarios";


const getToken = () => {
  const usuario = JSON.parse(sessionStorage.getItem('usuarioKey'));
  return usuario ? usuario.token : null;
};


const authFetch = async (url, options = {}) => {
  const token = getToken();

  if (!options.headers) {
    options.headers = {};
  }

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
       await Swal.fire({
        title: "Sesión Expirada",
        text: "Tu credencial ha vencido por seguridad. Por favor, inicia sesión nuevamente.",
        icon: "warning",
        confirmButtonText: "Entendido",
        customClass: {
            popup: 'swal-popup-custom',
            confirmButton: 'btn-swal-confirm',
            title: 'swal2-title',
            htmlContainer: 'swal2-html-container'
        },
        buttonsStyling: false
      });
      
      sessionStorage.removeItem('usuarioKey');
      
      window.location.href = '/'; 
      
      return null; 
    }

    return response;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};
export const obtenerProducto = async () => {
  const res = await fetch(URL_PRODUCTOS);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const crearProducto = async (formData) => {
  const token = getToken();
  try {
    const res = await authFetch(URL_PRODUCTOS, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}` 
      },
      body: formData, 
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const editarProductoService = async (id, formData) => {
  const token = getToken();
  try {
    const res = await authFetch(`${URL_PRODUCTOS}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const borrarProductoService = async (id) => {
  const token = getToken();
  try {
    const res = await authFetch(`${URL_PRODUCTOS}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const loginAPI = async (usuario) => {
  try {
    const respuesta = await fetch(`${URL_USUARIOS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const registroAPI = async (usuario) => {
  try {
    const respuesta = await fetch(`${URL_USUARIOS}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const obtenerUsuarios = async () => {
  const token = getToken();
  if (!token) {
      return; 
    }
  try {
    const respuesta = await authFetch(URL_USUARIOS, {
      headers: {
        "Authorization": `Bearer ${token}` 
      }
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const borrarUsuarioAPI = async (id) => {
  const token = getToken();
  try {
    const respuesta = await authFetch(`${URL_USUARIOS}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
export const editarUsuarioAPI = async (id, datos) => {
  const token = getToken();
  try {
    const respuesta = await authFetch(`${URL_USUARIOS}/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(datos),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export const crearUsuarioAdmin = async (datos) => {
  const token = getToken();
  try {
    const respuesta = await authFetch(`${URL_USUARIOS}/registro`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(datos),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};