function agruparPorPropiedad(array, propiedad) {
    return array.reduce((resultado, objeto) => {
        const clave = objeto[propiedad];
                if (!resultado[clave]) {
                    resultado[clave] = [];
            }
                resultado[clave].push(objeto);
                      return resultado;
                    }, {});
                }
const datos = [
            { nombre: 'Juan', edad: 25 },
            { nombre: 'Luis', edad: 24 },
            { nombre: 'Pedro', edad: 21 }
];
const agrupadosPorEdad = agruparPorPropiedad(datos, 'edad');
console.log(agrupadosPorEdad);