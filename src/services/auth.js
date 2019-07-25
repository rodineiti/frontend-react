import constants from "../constants";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
    isBrowser() && window.sessionStorage.getItem(constants.AUTH_TOKEN)
        ? JSON.parse(window.sessionStorage.getItem(constants.AUTH_TOKEN))
        : {};

export const setUser = user => {
    user ?
        window.sessionStorage.setItem(constants.AUTH_TOKEN, JSON.stringify(user)) :
        window.sessionStorage.removeItem(constants.AUTH_TOKEN);
}

export const isLoggedIn = () => {
    const user = getUser();
    return !!user.access_token;
}

export const logout = () => {
    setUser({});
}