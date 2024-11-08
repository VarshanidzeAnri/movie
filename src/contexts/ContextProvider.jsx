import { useContext, useState, createContext } from "react"

const StateContext = createContext({
    token: null,
    userRole: null,
    setToken: () => {},
    setUserRole: () => {},
    removeToken: () => {},
    handleMoveTop: () => {},
})

export const ContextProvider = ({children}) => {
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [userRole, setUserRole] = useState(localStorage.getItem('USER_ROLE'))

    const setToken = (token) => {
        _setToken(token)
        if (token){
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const removeToken = () => {
        localStorage.removeItem("ACCESS_TOKEN")
    }

    function handleMoveTop() {
        window.scrollTo({ top: 0 });
      }

    return <StateContext.Provider value={{
        token,
        userRole,
        setToken,
        setUserRole,
        removeToken,
        handleMoveTop,
    }}>
        {children}
    </StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);