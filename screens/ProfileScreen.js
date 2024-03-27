// import { StyleSheet, Text, View, Button } from 'react-native';
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import React, { useEffect, useState } from 'react';
// import { Header } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, Text, View, Button, Image, TouchableOpacity,Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Header } from 'react-native-elements';
import { MaterialIcons } from "@expo/vector-icons";

import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Colors from '../utils/Colors';

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyCzxHBFIFRa_jdkur1BYThjb5hxTf1COZg",
  authDomain: "booking-1f747.firebaseapp.com",
  projectId: "booking-1f747",
  storageBucket: "booking-1f747.appspot.com",
  messagingSenderId: "876313305741",
  appId: "1:876313305741:web:0a230fcc3a9a656f5e38c4",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(); // Initialize Firebase storage

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(null);
  const auth = getAuth(app); // Obtain auth instance from Firebase app
  const [image, setImage] = useState(null);


  useEffect(() => {
    // Listen for authentication state changes and update user state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up subscription when component unmounts
    return unsubscribe;
  }, [auth]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('data added');
      setImage(result.assets[0].uri);
    }
  };

  console.log(image);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        backgroundColor="#003580"
        leftComponent={<Icon name="user" size={24} color="white" />}
        centerComponent={{
          text: "Profile",
          style: { color: "#fff", fontSize: 20 },
        }}
      />
      <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image == null
                  ? require("../assets/rot.png")
                  : { uri: image }
                  // ? { uri: image }
                  // : require("../assets/rot.png")
              }
              style={styles.profileImage}
            />
            <View style={styles.cameraIcon}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={Colors.GRAY}
              />
            </View>
          </TouchableOpacity>
        </View>
      {/* User Info */}
      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.text}>Welcome, {user.email}</Text>
          {/* You can display more user information here */}
          <Button title="Sign Out" onPress={() => signOut(auth)} />
        </View>
      ) : (
        <Text style={styles.text}>No user signed in</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  noProfilePicText: {
    fontSize: 16,
    marginBottom: 10,
  },
  uploadButton: {
    color: "#007BFF",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: Colors.BLACK,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

// const ProfileScreen = () => {
//   const [user, setUser] = useState(null);
//   const auth = getAuth(app); // Obtain auth instance from Firebase app

//   useEffect(() => {
//     // Listen for authentication state changes and update user state
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     // Clean up subscription when component unmounts
//     return unsubscribe;
//   }, [auth]);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Header
//         backgroundColor="#003580"
//         leftComponent={<Icon name="user" size={24} color="white" />}
//         centerComponent={{ text: 'Profile', style: { color: '#fff', fontSize: 20 } }}
//       />
//       {/* User Info */}
//       {user ? (
//         <View style={styles.userInfo}>
//           <Text style={styles.text}>Welcome, {user.email}</Text>
//           {/* You can display more user information here */}
//           <Button title="Sign Out" onPress={() => signOut(auth)} />
//         </View>
//       ) : (
//         <Text style={styles.text}>No user signed in</Text>
//       )}
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   userInfo: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });
