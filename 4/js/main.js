const DESCRIPTIONS = [
  'Супер!',
  'У бабушки.',
  'Жизнь моя жизнь.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат.',
  'Как можно было поймать такой неудачный момент?!'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USERS = [
  {name:'Иван',
    id: 1},
  {name:'Хуан',
    id: 2},
  {name:'Мария',
    id: 3},
  {name:'Кристоф',
    id: 4},
  {name:'Виктор',
    id: 5},
  {name:'Юлия',
    id: 6},
];

const ITEMS_COUNT = 25;
const MAX_COMMENTS_COUNT = 10;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const getComments = (parrentId) => {
  const items = [];
  const userId = getRandomPositiveInteger(1,USERS.length);
  const user = USERS.find((element) => element.id === userId);
  const total = getRandomPositiveInteger(1,MAX_COMMENTS_COUNT);
  for(let i = 1; i <= total; i++){
    const item = {
      id:  String(parrentId) + i,
      avatar: `img/avatar-${user.id}.svg`,
      message: getRandomArrayElement(COMMENT_MESSAGES),
      name: user.name
    };
    items.push(item);
  }
  return items;
};

const getRandomItems = () => {
  const items = [];
  while (items.length < ITEMS_COUNT) {
    const id = getRandomPositiveInteger(1, ITEMS_COUNT);
    if(items.find((element) => element.id === id)) {
      continue;
    }

    const item = {
      id,
      url: `photos/${id}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes : getRandomPositiveInteger(15,200),
      comments : getComments(id)
    };

    items.push(item);

  }
  return items;
};

getRandomItems();

