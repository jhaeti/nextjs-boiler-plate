import { wrapper } from "../redux/store";
import "../public/scss/style.scss";
const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
