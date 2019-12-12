import dva from 'dva';
import 'font-awesome/less/font-awesome.less';
import './index.css';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// 1. Initialize
const app = dva({
    history: history
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
