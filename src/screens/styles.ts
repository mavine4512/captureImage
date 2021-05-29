import {StyleSheet} from 'react-native';

const Styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
    },
    imageContainer: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#eee',
      marginTop: 20,
      width: '80%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '80%',
      margin: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    previewImage: {
      width: '100%',
      height: '100%',
    },
    storeImage: {
      width: 150,
      height: 150,
      margin: 12,
      justifyContent: 'space-between',
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    flatItems: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Styles;
