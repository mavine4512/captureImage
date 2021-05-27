import React, {useEffect, useState} from 'react';
import {View, Button, Text, Image, StyleSheet, FlatList} from 'react-native';
import storage from '@react-native-firebase/storage';
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
  const [photo, setPhoto] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const i: string[] = [];
    storage()
      .ref('/images/')
      .list()
      .then(files => {
        files.items.map(file => {
          file.getDownloadURL().then(url => {
            i.push(url);
            setImages(i);
          });
        });
        console.log('images:', images);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (photo) {
      const filename = photo.path.replace(/^.*[\\\/]/, '');
      const reference = storage().ref('/images/' + filename);
      reference
        .putFile(photo.path)
        .then(status => {
          // console.log('s', status);
        })
        .catch(error => {
          //  console.log('e', error);
        });
    }
  }, [photo]);
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
        setPhoto(image);
        //  uploadImage();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    console.log('data :', images),
    (
      <>
        <View style={styles.container}>
          {photo == null ? (
            <View style={styles.imageContainer}>
              <Text>Kindly load an image</Text>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: photo?.path,
                }}
                style={styles.previewImage}
              />
            </View>
          )}

          <View style={styles.button}>
            <Button title="Pick Image" onPress={() => onAvatarClicked()} />
          </View>
        </View>
        <View style={styles.flatItems}>
          {images == null ? (
            <View style={styles.imageContainer}>
              <Text>Loading ...</Text>
            </View>
          ) : (
            <FlatList
              data={images}
              keyExtractor={item => item}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <Image
                    source={{
                      uri: item,
                    }}
                    style={styles.storeImage}
                    resizeMode={'contain'}
                  />
                </View>
              )}
            />
          )}
        </View>
      </>
    )
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
  storeImage: {
    width: 130,
    height: 130,
    margin: 5,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  flatItems: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
