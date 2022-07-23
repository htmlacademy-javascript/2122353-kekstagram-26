const config = {
  getData: {
    url: 'https://26.javascript.pages.academy/kekstagram/data',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  sendData: {
    url: 'https://26.javascript.pages.academy/kekstagram',
  },
  effects: {
    defaultScaleValue: 100,
    defaultScaleValueStep: 25,
    minScaleValue: 25,
    maxScaleValue: 100,
    values: [
      'none',
      'chrome',
      'sepia',
      'marvin',
      'phobos',
      'heat',
    ],
  },
  fullPicture: {
    commentViewDefaultCount: 5,
  }
};

export { config };
