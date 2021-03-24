let loggedInUser = {};

export const useLoggedInUser = () => {
    return {...loggedInUser}
}

export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
}

export const registerUser = (userObj) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response=>response.json())
    .then(parsedUser => {
        setLoggedInUser(parsedUser);
        return useLoggedInUser();
    })
}

export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?username=${userObj.username}&email=${userObj.email}`)
    .then(response => response.json())
    .then(parsedUser => {
        //parsedUser comes back as an array
        //if there was a match, the array will contain the user object
        if (parsedUser.length > 0) {
            setLoggedInUser(parsedUser[0]);
            return useLoggedInUser();
        } else {
            //No matching user found
            return false;
        }
    })
}

export const logoutUser = () => {
    loggedInUser = {};
}

export const displayLoginRegister = () => {
    const DOMselect = document.querySelector(".loginRegisterContainer");
    DOMselect.innerHTML = `
            <div class="loginContainer">
                <h3>Login</h3>
                <label for="loginUsername">Username</label>
                <input type="text" name="loginUsername" id="loginUsername">
                <label for="loginEmail">Email</label>
                <input type="text" name="loginEmail" id="loginEmail">
                <button id="loginBtn">Login</button>
            </div>
            <div class="registerContainer">
                <h3>Register</h3>
                <label for="registerUsername">Username</label>
                <input type="text" name="registerUsername" id="registerUsername">
                <label for="registerEmail">Email</label>
                <input type="text" name="registerEmail" id="registerEmail">
                <button id="registerBtn">Register</button>
            </div>
    `
}

export const displayLogout = (currentUserObj) => {
    const DOMselect = document.querySelector(".loginRegisterContainer");
    DOMselect.innerHTML = `<button id="logoutBtn">Logout</button>`;
    const headerSelect = document.querySelector("#usernameDisplay");
    headerSelect.innerHTML = `${currentUserObj.username}`;
}