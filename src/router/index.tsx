import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routerArr';
import { connect } from 'react-redux';
import { saveToken } from '@/store/actions/userAction';

const RouterFn = () => {
  let token: any = 123;
  return (
    <BrowserRouter basename="/">
      <div className="app-wrap in-w">
        <Switch>
          {routes.map((item) => {
            return (
              <Route
                key={item.path + item.auth}
                path={item.path}
                exact
                render={(props: any) => {
                  if (!item.auth) {
                    return item.path === '/' ? (
                      <Redirect to="/login" />
                    ) : (
                      <item.component {...props} />
                    );
                  }
                  return token ? <item.component {...props} /> : <Redirect to="/login" />;
                }}
              />
            );
          })}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const stateProps = (state: any) => {
  return {
    token: state?.userReducer?.token,
  };
};

const actionToProps = (dispatch: any) => ({
  setToken: (token: string) => dispatch(saveToken(token)),
});

export default connect(stateProps, actionToProps)(RouterFn);
