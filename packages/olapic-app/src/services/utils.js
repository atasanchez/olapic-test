import httpModule from 'Config/http';
import env from '../../../../config/env';

const getPhotos = async places => Promise.all(places.map(place => httpModule.get('https://pixabay.com/api/', {
  params: {
    key: env.pixabayApiKey,
    q: place.city,
    image_type: 'photo',
    category: 'places',
  },
}).then((resPhotos) => {
  resPhotos.data.hits.map((hit) => {
    hit.city = place.city.replace('+', ' ');
    hit.country = place.country;
    return hit;
  });
  return resPhotos;
})));

const getVideos = async places => Promise.all(places.map(place => httpModule.get('https://pixabay.com/api/videos/', {
  params: {
    key: env.pixabayApiKey,
    q: place.city,
    image_type: 'video',
  },
}).then((resVideos) => {
  resVideos.data.hits.map((hit) => {
    hit.city = place.city.replace('+', ' ');
    hit.country = place.country;
    return hit;
  });
  return resVideos;
})));

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getMediaFromNearbyCities = places => new Promise((resolve, reject) => {
  Promise.all([getPhotos(places), getVideos(places)])
    .then((resPhotosAndVideos) => {
      let data = resPhotosAndVideos.reduce((firstItem, secondItem) => firstItem.concat(secondItem))
        .filter(x => x !== undefined && x.data.totalHits > 0)
        .map(x => x.data.hits);

      if (data.length > 0) {
        data = data.reduce((firstHit, secondHit) => firstHit.concat(secondHit)).slice(0, 15);
      }

      resolve(shuffle(data));
    }).catch(e => reject(e));
});

const getCurrentISSPositionAndNearbyCities = async () => {
  try {
    return await httpModule.get(`${env.apiUrl}`);
  } catch (error) {
    throw (error);
  }
};

export {
  getCurrentISSPositionAndNearbyCities,
  getMediaFromNearbyCities,
};
