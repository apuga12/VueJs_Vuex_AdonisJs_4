
// Config para adjuntar Namespaces en la App
function mapValues (obj, f) {
  const res = {};
  Object.keys(obj).forEach(key => {
    res[key] = f(obj[key], key)
  });
  return res;
}

// Esto sirve para separar los namepaces por modulos, que después se van a mapear
export default (module, types) => {
  let newObj = {};
  mapValues(types, (names, type) => {
    newObj[type] = {};
    types[type].forEach(name=> {
      newObj[type][name] = module + ':' + name;
    });
  });
  return newObj;
}
// .Config para adjuntar Namespaces en la App

// La config sirve para reutilizar el export de cada modulo
/* // Ejemplo de como utilizarlo:
export default namespace('auth', {
	getters: [
		'user'
	],
	actions: [
		'login'
	],
	mutations: [
		'setUser'
	]
});
*/