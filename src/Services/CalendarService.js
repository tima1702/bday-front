const fakeData = {
    January: [],
    February: [{
        day: 3,
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
            day: 4,
            fullName: 'Тимофей Кузнецов',
            fields: {
                flag: 'rus',
            },
        }],
    April: [{
        day: 12,
        fullName: 'Тимофей Кузнецов',
        fields: {
            flag: 'rus',
        },
    },
        {
            day: 1,
            fullName: 'Тимофей Кузнецов',
            fields: {
                flag: 'rus',
            },
        }],
    May: [],
    June: [],
    July: [],
    August: [{
      day: 30,
      fullName: 'Тимофей Кузнецов',
      fields: {
        flag: 'rus',
      },
    }],
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
