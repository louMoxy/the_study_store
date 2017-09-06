require('./less/style.less');
const App = require('./app');
window.app = new App();

// On document ready
function ready(fn) {
    if ((document.readyState === 'complete') ||
        (document.readyState !== 'loading')) {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(window.app.init.bind(window.app));
