import {getBdaysList,deleteBday} from "../api";

class CalendarService {
    fetchList() {
        return getBdaysList().then(res => res.data);
        // return new Promise(resolve => {
        //     setTimeout(resolve, 3000, fakeData);
        // });
    }
    deleteBday(id) {
        return deleteBday(id).then(res => res.data);
    }
}

export default new CalendarService();

// const fakeData = {
//     January: [],
//     February: [{
//         day: 3,
//         fullName: 'Тимофей Кузнецов',
//         fields: {
//             flag: 'rus',
//         },
//     }],
//     March: [{
//         day: 17,
//         fullName: 'Тимофей Кузнецов',
//         fields: {
//             flag: 'rus',
//         },
//     },
//         {
//             day: 4,
//             fullName: 'Тимофей Кузнецов',
//             fields: {
//                 flag: 'rus',
//             },
//         }],
//     April: [{
//         day: 12,
//         fullName: 'Тимофей Кузнецов',
//         fields: {
//             flag: 'rus',
//         },
//     },
//         {
//             day: 1,
//             fullName: 'Тимофей Кузнецов',
//             fields: {
//                 flag: 'rus',
//             },
//         }],
//     May: [],
//     June: [],
//     July: [],
//     August: [{
//         day: 30,
//         fullName: 'Тимофей Кузнецов',
//         fields: {
//             flag: 'rus',
//         },
//     }],
//     September: [],
//     October: [],
//     November: [],
//     December: [],
// };
