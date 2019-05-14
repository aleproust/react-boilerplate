import app from 'firebase/app';
import 'firebase/auth';
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  

  loginWithGithub = () => {
    var provider = new app.auth.GithubAuthProvider();
    provider.addScope('repo');
    return this.auth.signInWithPopup(provider).then(result =>
       ({
        email: result.user.email,
        avatar: result.user.photoURL,
        uid:result.user.uid,
        accessToken:result.credential.accessToken
      })
    ).catch((error) => {  
      // Handle Errors here.
      var errorCode = error.code;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
      } else {
          console.error(error);
      }
  });
  }
  doSignOut = () => this.auth.signOut();
}

export default Firebase;