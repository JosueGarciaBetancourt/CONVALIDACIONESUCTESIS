const routes = {
	// RUTAS PÚBLICAS
	apiTester: "/api-tester",
	login: "/login",

	// RUTAS PRIVADAS
	dashboard: "/dashboard",
		// Rutas hijas de dashboard
		inicio: "/inicio",
		convalidaciones: "/convalidaciones",
			// Rutas hijas de convalidaciones
			nuevaConvalidacion: "/nuevo",
		universidades: "/universidades",
		cursos: "/cursos",
		configuracion: "/configuracion",
		ayuda: "/ayuda",
  };
  
  export default routes;
  