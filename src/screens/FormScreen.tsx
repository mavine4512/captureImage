import React, {useState} from 'react';
import { View, Button, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import storage from '@react-native-firebase/storage';
// import {utils} from '@react-native-firebase/app';
import ImageCropPicker from 'react-native-image-crop-picker';

export interface ImagePickerResponse {
  didCancel?: boolean;
  errorMessage?: string;
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string; //TODO
  fileName?: string;
  duration?: number;
}

const FormScreen: React.FC<ImagePickerResponse> = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [photo, setPhoto] = useState<any>(null);
  // const reference = storage().ref('black-t-shirt-sm.png');

  const onAvatarClicked = (): void => {
    //start image cropper service
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      useFrontCamera: true,
      useBackCamera: true,
      avoidEmptySpaceAroundImage: true,
      cropperToolbarColor: 'white',
      cropperStatusBarColor: 'white',
      cropperTintColor: 'green',
      cropperToolbarTitle: 'Edit Avatar',
      cropperToolbarWidgetColor: 'black',
      forceJpg: true,
    })
      .then(image => {
        console.log(image);
        setSelectedImage(image.path);
        setPhoto(photo);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSave = (): void => {
console.log('save ')
      // <TouchableOpacity
      //   onPress={async () => {
      //     // path to existing file on filesystem
      //     const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
      //     // uploads file
      //     await reference.putFile(pathToFile);
      //   }}
      // />
  };


  return (
    <View style={styles.container}>
      {selectedImage === '' ? (
        <View style={styles.imageContainer}>
          <Text>Kindly load an image</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: selectedImage,
            }}
            style={styles.previewImage}
          />
        </View>
      )}

      <View style={styles.button}>
        <Button title="Save " onPress={onSave} />
        <Button title="Pick Image" onPress={onAvatarClicked} />
      </View>
    </View>
  );
};

export default FormScreen;
const styles = StyleSheet.create({
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
});


