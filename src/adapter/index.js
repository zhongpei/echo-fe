import React, { useState, createContext, useEffect } from "react";
import moment from 'moment';
import apis from 'apis';
export const AppContext = createContext({});

const Adpater = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let user = apis.getStore();
    setUser({
      ...user,
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });
    apis.refreshToken().then(res => {
      if (res.message === '请重新登录') {
        localStorage.removeItem("Echo-4G-USER");
        setUser({
          overdue: true
        });
      }
    });
    let timer = setInterval(() => {
      apis.refreshToken().then(res => {
        if (res.status === 0) {
          user = apis.getStore();
          user.loginToken = res.data;
          apis.setStore(user);
          setUser({
            ...user,
            time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          });
        }
      })
    }, 60 * 1000);
    return () => {
      timer && clearInterval(timer);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Adpater;
