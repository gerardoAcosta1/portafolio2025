const api = {
    getCajas: async () => {
      const res = await fetch("http://localhost:3001/cajas");
      if (!res.ok) throw new Error("Error al obtener cajas");
      return res.json();
    },

    crearCaja : async (data) => {
        const res = await fetch("http://localhost:3001/crearCaja", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Error al crear caja");
        return res.json();
      },


      eliminarCaja: async (id) => {
        const res = await fetch(`http://localhost:3001/cajas`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(id),
        });
        if (!res.ok) throw new Error("Error al eliminar caja");
        return res.json();
      },
    getObjetos: async () => {
        const res = await fetch("http://localhost:3001/objetos");
        if (!res.ok) throw new Error("Error al obtener objetos");
        return res.json();
      },

      crearObjeto : async (data) => {
        const res = await fetch("http://localhost:3001/crearObjeto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Error al crear objeto");
        return res.json();
      },

      eliminarObjeto : async (data) => {
        const res = await fetch("http://localhost:3001/eliminarObjeto", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Error al ELIMINAR objeto");
        return res.json();
      },


    crearCaja: async (data) => {
      const res = await fetch("http://localhost:3001/crearCaja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear usuario");
      return res.json();
    },
  
    
  };
  
  export default api;