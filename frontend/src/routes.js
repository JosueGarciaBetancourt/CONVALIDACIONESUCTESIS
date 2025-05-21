const routes = {
	// RUTAS PÚBLICAS
	apiTester: "/api-tester",
	login: "/login",

	// RUTAS PRIVADAS
	dashboard: "/dashboard",

	// Rutas hijas de dashboard
	inicio: "/dashboard/inicio",
	convalidaciones: "/dashboard/convalidaciones",
	universidades: "/dashboard/universidades",
	cursos: "/dashboard/cursos",
	configuracion: "/dashboard/configuracion",
	ayuda: "/dashboard/ayuda",

	// Rutas hijas de convalidaciones
	nuevaConvalidacion: "/dashboard/convalidaciones/nuevo",
  };
  
  export default routes;
  