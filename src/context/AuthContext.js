import { useState, createContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const authCookie = localStorage.getItem('auth')?JSON.parse(localStorage.getItem('auth')): null;
    const [user, setUser] = useState(authCookie ? jwt_decode(authCookie.accessToken) : null )
    const [token, setToken] = useState(authCookie ? authCookie : null);
    const [refreshTokenTimerId, setRefreshTokenTimerId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [productCount, setProductCount] = useState(0);

    const Logout = () => {
        localStorage.removeItem("auth");
        setUser(null);
        clearTimeout(refreshTokenTimerId);
      };

    const Authdata = {
        user: user,
        setUser: setUser,
        token: token,
        setToken: setToken,
        Logout:Logout,
        filteredData:filteredData,
        setFilteredData : setFilteredData,
        productCount:productCount,
        setProductCount:setProductCount
    }

    return <AuthContext.Provider value={Authdata}>
            {children}
    </AuthContext.Provider>
}
