import { wrapper } from "../redux/store";
import "../public/css/style.scss";
const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
