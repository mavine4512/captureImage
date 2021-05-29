import React, {useEffect, useState} from 'react';
import {View, Button, Text, Image, ScrollView, FlatList} from 'react-native';
import Styles from './styles';
import storage from '@react-native-firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker';

const {container, imageContainer, button, previewImage, storeImage, flatItems} =
  Styles();

export interface ImagePickerResponse {
  didCancel?: boolean;
  errorMessage?: string;
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
}

const FormScreen: React.FC<ImagePickerResponse> = () => {
  const [photo, setPhoto] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  const storeImages = () => {
    const sImage: string[] = [];
    storage()
      .ref('/images/')
      .list()
      .then(files => {
        files.items.map(file => {
          file.getDownloadURL().then(url => {
            sImage.push(url);
            setImages(sImage);
          });
        });
        // console.log('images:', images);
      })
      .catch(error => {
        // console.error(error);
      });
  };

  useEffect(() => {
    {
      storeImages();
    }
  }, []);

  const getPhoto = () => {
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
  };

  useEffect(() => {
    {
      getPhoto();
    }
  });

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
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={container}>
        {photo == null ? (
          <View style={imageContainer}>
            <Text>Kindly load an image</Text>
          </View>
        ) : (
          <View style={imageContainer}>
            <Image
              source={{
                uri: photo?.path,
              }}
              style={previewImage}
            />
          </View>
        )}

        <View style={button}>
          <Button title="Pick Image" onPress={() => onAvatarClicked()} />
        </View>
      </View>
      <View style={flatItems}>
        {images == null ? (
          <View style={imageContainer}>
            <Text>Loading ...</Text>
          </View>
        ) : (
          <ScrollView>
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
                    style={storeImage}
                  />
                </View>
              )}
            />
            <View style={{height: 490}} />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default FormScreen;
