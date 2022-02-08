import { useRouter } from "next/router";
import { useState } from "react";
import { signin, authenticate, isAuthenticated } from "../src/auth";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Signin = () => {
    
  const router = useRouter();

  const [values, setvalues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { user } = isAuthenticated;

  const { email, password, error, loading, didRedirect } = values;

  const onhandleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.errors) {
          return setvalues({ ...values, error: data.errors });
        }
        if (data.error) {
          return setvalues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setvalues({
              ...values,
              email: "",
              password: "",
              error: "",
              loading: true,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin fails"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user) {
        router.push("/");
      } else {
        router.push("/signin");
      }
    }
    if (isAuthenticated()) {
      router.push("/");
    }
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-warning"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (

      <div className="container mt-5 pt-5">
        {errorMessage()}
        <div className="card border bg-success border-2 w-75 mx-auto">
          <div className="card-body">
            <h4 className="loginText text-center w-25 mx-auto">Log In</h4>
            <div className="row">
            <div className="col-md-6 text-center">
              <AdminPanelSettingsIcon className="signinPageLogo"/>
            </div>
            <div className="col-md-6">
            <form className="mt-5">
              <div className="form-group">
                <label className="text-light w-75">Email</label>
                <input
                  value={email}
                  onChange={onhandleChange("email")}
                  className="form-control"
                  type="email"
                />
                <br />
              </div>
              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                  value={password}
                  onChange={onhandleChange("password")}
                  className="form-control"
                  type="password"
                />
              </div>
              <br />
              <br />
              <div className="text-center">
              <button
                onClick={onSubmit}
                className="btn btn-warning"
                type="submit"
              >
                submit
              </button>
              </div>
            </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>
  {signInForm()}
  {performRedirect()}
  </>;
};

export default Signin;
