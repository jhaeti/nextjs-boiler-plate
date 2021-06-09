import { Layout } from "../components/Layout";
import Login from "../components/Login";

const login = () => {
  return (
    <Layout title="Login" description="Page for users to login">
      <Login />
    </Layout>
  );
};

export default login;
