import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const signUpAPI = (data) => {
    console.log(data);

    try {
        return new Promise(function (resolve, reject) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);

                    const auth = getAuth();
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!
                            console.log("Email Verification sent.");
                            resolve({ message: "Email verification sent!", user: user })

                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(error.message);

                    if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                        reject({ message: "Email Already Used." })
                    } else if (errorCode.localeCompare("auth/weak-password") === 0) {
                        reject({ message: "The password must be 6 characters long or more." })
                    }

                    reject({ message: error.message });
                });

        })

    } catch (error) {
        const errorMessage = error.message;

        return errorMessage;
    }
}


export const logInAPI = (data) => {
    console.log(data);

    try {
        return new Promise(function (resolve, reject) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);

                    const auth = getAuth();
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            if (user.emailVerified) {
                                resolve({ message: "Loging Successfully Done!", user: user });
                            } else {
                                reject({ message: "Email Is Not Verified." })
                            }
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error.message);

                    if (errorCode.localeCompare("auth/invalid-login-credentials") === 0) {
                        reject({ message: "Invalid Email Or Password" })
                    }

                    reject({ message: error.message })
                });

        })

    } catch (error) {
        const errorMessage = error.message;

        return errorMessage;
    }
}


export const forgetAPI = (data) => {
    console.log(data);

    try {
        return new Promise(function (resolve, reject) {
            sendPasswordResetEmail(auth, data.email)
                .then(() => {
                    resolve({ message: "Reset Password In Email Sent" })
                    // Password reset email sent!
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    reject({ message: errorMessage })
                });
        })

    } catch (error) {
        const errorMessage = error.message;

        return errorMessage;
    }
}


export const logOutAPI = () => {

    try {
        return new Promise(function (resolve, reject) {
            signOut(auth)
                .then(() => {
                    resolve({ message: "LogOut Succussfully!" })
                    // Sign-out successful.
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    reject({ message: "LogOut Is Not Succussfully!" })
                    console.log(errorMessage);
                    // An error happened.
                });
        })

    } catch (error) {
        const errorMessage = error.message;

        return errorMessage;
    }
}
