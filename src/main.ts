import App from './App.svelte';
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/materialize-css/dist/js/materialize';


const app = new App({
	target: document.body,
});

//@ts-expect-error
M.AutoInit();

export default app;