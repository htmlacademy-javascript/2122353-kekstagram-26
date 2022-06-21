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
const MAX_COMMENTS_COUNT = 2;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const getComments = () => {
  const items = [];
  const total = getRandomPositiveInteger(1,MAX_COMMENTS_COUNT);
  for(let i = 1; i <= total; i++){
    const randomIndex = getRandomPositiveInteger(0, USERS.length - 1);
    const user = USERS[randomIndex];
    const item = {
      id:  Math.floor(Date.now() * Math.random()),
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
  const generatedIds = Array.from(Array(ITEMS_COUNT).keys()).map((index) => index + 1);
  generatedIds.sort((a, b) => 0.2 - Math.random());
  for(let i = 0; i < generatedIds.length; i++){
    const id = generatedIds[i];
    const item = {
      id,
      url: `photos/${id}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes : getRandomPositiveInteger(15,200),
      comments : getComments()
    };

    items.push(item);

  }

  return items;
};
