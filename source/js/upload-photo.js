
const TYPES_OF_FILES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
const SRC_AVATAR = 'img/muffin-grey.svg';
const MAX_PHOTO_FILES = 8;
const PhotoPreviewSize = {
  WIDTH: 70,
  HEIGHT: 70,
}

const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoPreview = document.querySelector('.ad-form__photo');

// Установить превью аватарки при выборе файла
const onAvatarFileChange = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = TYPES_OF_FILES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
}
export { onAvatarFileChange };

// Очистить превью аватарки
const clearAvatar = () => {
  avatarPreview.src = SRC_AVATAR;
}
export { clearAvatar };

// Очистить превью фотографий
const clearPhotos = () => {
  housePhotoPreview.textContent = '';
}
export { clearPhotos };

// Установить превью при выборе фотографии
const onPhotosFilesChange = (evt) => {
  const files = evt.target.files;
  if (files.length > MAX_PHOTO_FILES) {
    alert('Ошибка, можно выбрать не более 8 файлов');
    return false;
  }
  for (let i = 0; i < files.length; i++) {
    let matches = TYPES_OF_FILES.some((it) => files[i].name.toLowerCase().endsWith(it));
    if (!matches) {
      alert('Ошибка! Неверный формат файлов!');
      return false;
    }
  }
  const imagesFragment = document.createDocumentFragment();
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.readAsDataURL(files[i]);
    const imageElement = document.createElement('img');
    reader.addEventListener('load', () => {
      imageElement.width = PhotoPreviewSize.WIDTH;
      imageElement.height = PhotoPreviewSize.HEIGHT;
      imageElement.src = reader.result;
      imageElement.alt = 'Фотография жилья ' + (i + 1);
    });
    imagesFragment.appendChild(imageElement);
  }
  clearPhotos();
  housePhotoPreview.appendChild(imagesFragment);
}
export { onPhotosFilesChange };

