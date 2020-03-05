const fakeData = {
  January: [],
  February: [{
    day: 17,
    fullName: 'Тимофей Кузнецов',
    fields: {
      flag: 'rus',
    },
  }],
  March: [{
    day: 17,
    fullName: 'Тимофей Кузнецов',
    fields: {
      flag: 'rus',
    },
  },
    {
      day: 17,
      fullName: 'Тимофей Кузнецов',
      fields: {
        flag: 'rus',
      },
    }],
  April: [],
  May: [],
  June: [],
  July: [],
  August: [],
  September: [],
  October: [],
  November: [],
  December: [],
};

class CalendarService {
  list() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000, fakeData);
    });
  }
}

export default new CalendarService();
