import React, {useEffect} from 'react';
import moment from "moment";
import './style.scss';

function Calendar({date, importantDates, clickPrevButton, clickNextButton,classNameCursor}) {//importantDates = [number,number.....]

    let arrayOfDays = [];//массив с днями для формирования календаря

    //получаем день недели, с которого начинается месяц (0 - Sunday)
    let firstDayOfMonth = Number(moment('01/' + date.format('MM/YYYY'), "DD/MM/YYYY").format('d'));
    let lastDayOfMonth = Number(moment(moment(date, "YYYY-MM").daysInMonth() + '/' + date.format('MM/YYYY'), "DD/MM/YYYY").format('d'));
    //поправки на то, что (0) - это воскресенье (воскресенье будем считать (7) - так удобнее)
    firstDayOfMonth = (firstDayOfMonth === 0) ? 7 : firstDayOfMonth;
    lastDayOfMonth = (lastDayOfMonth === 0) ? 7 : lastDayOfMonth;

    for (let i = 1; i < firstDayOfMonth; i++) {//добавляем дни предыдущего месяца (бледные)
        let per = moment('01/' + date.format('MM/YYYY'), "DD/MM/YYYY").subtract((firstDayOfMonth - i), 'days').format('DD');

        arrayOfDays.push(<li className='dayOfAnotherMonth' key={'dayOfLastMonth' + i}>{per}</li>);
    }

    for (let i = 0; i < moment(date, "YYYY-MM").daysInMonth(); i++) {//основная часть календаря
        let classWeekend = '';
        const day = Number(moment((i + 1) + '/' + date.format('MM/YYYY'), "DD/MM/YYYY").format('d'));
        if ((day === 6) || (day === 0)) {//если это суббота или воскресенье - выделяем их дургим цветом
            classWeekend = "weekend";
        }

        if (importantDates.includes(i + 1)) {//выделение тех дней, где есть события (ДР)
            arrayOfDays.push(<li key={'day' + i}><span className={"active " + classWeekend}>{i + 1}</span>
            </li>);
        } else {
            arrayOfDays.push(<li key={'day' + i}><span className={classWeekend}>{i + 1}</span></li>);
        }
    }

    for (let i = 0; i < (7 - lastDayOfMonth); i++) {//добавляем дни следующего месяца (бледные)
        arrayOfDays.push(<li className='dayOfAnotherMonth' key={'dayOfNextMonth' + i}>{i + 1}</li>);
    }
//console.log(classNameCursor);
    return (<div className={'calendar '+classNameCursor}>
        <div className="month">
            <ul>
                <li className="prev" onClick={clickPrevButton}>&#10094;</li>
                <li className="next" onClick={clickNextButton}>&#10095;</li>
                <li className='monthName'>{date.format('MMMM')}<br/><span
                    className="spanCalendar">{date.format('YYYY')}</span></li>
            </ul>
        </div>
        <ul className="weekdays">
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
        </ul>
        <ul className="days">
            {arrayOfDays}
        </ul>
    </div>);
}

export default Calendar;

//сделать окошко для выбора даты?
