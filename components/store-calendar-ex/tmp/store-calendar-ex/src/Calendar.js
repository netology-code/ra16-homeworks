import React from 'react'
import PropTypes from 'prop-types'

function Calendar ({now}) {
  let days = now.getDay()
  const week = [
    { id: 1, day: 'Понедельник' },
    { id: 2, day: 'Вторник' },
    { id: 3, day: 'Среда' },
    { id: 4, day: 'Четверг' },
    { id: 5, day: 'Пятница' },
    { id: 6, day: 'Суббота' },
    { id: 0, day: 'Воскресение' }
  ]
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  const monthNames2 = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ]
  let pre = [], navs = [], navs2 = [], navs3 = [], navs4 = [],
   navs5 = [], navs6=[], post = []
  let date = new Date(),
    y = now.getFullYear(),
    m = now.getMonth()
  let firstDay = new Date(y, m, 1)
  let lastDay = new Date(y, m + 1, 0)
  /*   navs.forEach((item,i,nav) => {
    console.log(nav[i])
    let day = now.getDate() + i 
    console.log(day)
    if (nav[i]===0||nav[i]===6){
        console.log('ui-datepicker-week-end')
    }      
})
*/
function getWeeks(year, month) // Внимание: Месяцы нумеруются с 0, как принято в JS
 {
  var l=new Date(year, month, 0);
  return Math.ceil( (l.getDate()- (l.getDay()?l.getDay():7))/7 )+1;
 }
 let weeks = getWeeks(y, m+1)
  let monthDays = new Date(y, m + 1, 0).getDate(),
  monthDaysPre = new Date(y, m, 0).getDate(),
  monthDaysPost = new Date(y, m+1, 0).getDate(),
  monthPrefix = new Date(y, m, 0).getDay(),
    monthPostfix = new Date(y, m+1, 0).getDay(),
    monthDaysText,
    numPrefix = 0,
    monthDaysText2 = ''
  let first
 console.log(monthDays, weeks, monthPrefix)

  for (let i = monthDaysPre-monthPrefix; i < monthDaysPre; i++) {
    pre.push(i+1)
     numPrefix++  
  }
  function generateRows () {
    return pre.map(function (nav) {
      return <td className='ui-datepicker-other-month'>{nav}</td>
    })
    }
    for (let i = 1; i <= 7-monthPrefix; i++) {
         navs.push(i)
     }
     for (let i = 7-monthPrefix+1; i <= 14-monthPrefix; i++) {
      navs2.push(i)
  }
  for (let i = 14-monthPrefix+1; i <= 21-monthPrefix; i++) {
    navs3.push(i)
}
for (let i =21-monthPrefix+1; i <= 28-monthPrefix; i++) {
  navs4.push(i)
}
if (weeks===5)
for (let i =28-monthPrefix+1; i <= monthDays; i++) {
  navs5.push(i)
}
else if (weeks===6&&monthDays===30){
  for (let i =28-monthPrefix+1; i <= monthDays-monthPrefix+5; i++) {
    navs5.push(i)
  } 
}
else if (weeks===6&&monthDays===31){
  for (let i =28-monthPrefix+1; i < monthDays-monthPrefix+5; i++) {
    navs5.push(i)
  } 
}

if (weeks===6)
for (let i =monthDays-monthPostfix+1; i <= monthDays; i++) {
  navs6.push(i)
}
for (let i = 1; i <= 7-monthPostfix; i++) {
  if (monthPostfix!==0)
  post.push(i)
   numPrefix++  
}

function navsFunc (navs) {
  if(weeks===4||weeks===5)
  return navs.map(function (nav) {
    if (nav===now.getDate()) return  <td className='ui-datepicker-today'>{nav}</td>
    else return <td>{nav}</td>
  })
  else if(weeks===6)
  return navs.map(function (nav) {
    if (nav===now.getDate()) return  <td className='ui-datepicker-today'>{nav}</td>
    else if (nav===monthDays-1){return <td>{nav}</td>}
    else if (nav!==monthDays-1){ return <td>{nav}</td>}
  })

}
function navsFunc2 () {
 if(weeks===6)
  return navs5.map(function (nav) {
    if (nav===now.getDate()) return  <td className='ui-datepicker-today'>{nav}</td>
    else if (nav===monthDays-1){ return <td>{nav}</td>}
    else if (nav!==monthDays-1){ return <td>{nav}</td>}
  })
}

  function generatePost () {
    if(weeks===5)
    return post.map(function (nav) {
      return <td className='ui-datepicker-other-month'>{nav}</td>
    })
    else if(weeks===6)
    return post.map(function (nav) {
      return <td className='ui-datepicker-other-month'>{nav}</td>
    })
    }
function generatePost2 () {
  if(weeks===6)
  return navs6.map(function (nav) {
    if (nav===now.getDate()) return  <td className='ui-datepicker-today'>{nav}</td>
    else if (nav===monthDays){ return <td>{nav}</td>}
    else if (nav!==monthDays){ return <td>{nav}</td>}
  })
}
function generatePost3 () {
  if(weeks===6)
    return post.map(function (nav) {
      if(nav===monthDays)  return <td>{nav}</td>
      else if(nav!==monthDays)
      return <td className='ui-datepicker-other-month'>{nav}</td>
    })
  }

  //alert(week.find(item => item.id === days).day)
  return (
    <div className='ui-datepicker'>
      <div className='ui-datepicker-material-header'>
        <div className='ui-datepicker-material-day'>
          {week.find(item => item.id === days).day}
        </div>
        <div className='ui-datepicker-material-date'>
          <div className='ui-datepicker-material-day-num'>{now.getDate()}</div>
          <div className='ui-datepicker-material-month'>
            {monthNames2[now.getMonth()]}
          </div>
          <div className='ui-datepicker-material-year'>{now.getFullYear()}</div>
        </div>
      </div>
      <div className='ui-datepicker-header'>
        <div className='ui-datepicker-title'>
          <span className='ui-datepicker-month'>
            {monthNames[now.getMonth()]}
          </span>
          &nbsp;
          <span className='ui-datepicker-year'>{now.getFullYear()}</span>
        </div>
      </div>
      <table className='ui-datepicker-calendar'>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className='ui-datepicker-week-end' />
          <col className='ui-datepicker-week-end' />
        </colgroup>
        <thead>
          <tr>
            <th scope='col' title='Понедельник'>
              Пн
            </th>
            <th scope='col' title='Вторник'>
              Вт
            </th>
            <th scope='col' title='Среда'>
              Ср
            </th>
            <th scope='col' title='Четверг'>
              Чт
            </th>
            <th scope='col' title='Пятница'>
              Пт
            </th>
            <th scope='col' title='Суббота'>
              Сб
            </th>
            <th scope='col' title='Воскресенье'>
              Вс
            </th>
          </tr>
        </thead>
        <tbody className='tbody'>
          <tr>
            {generateRows()}
            {navsFunc(navs)}
          </tr>
          <tr>
          {navsFunc(navs2)}
          </tr>
          <tr>
          {navsFunc(navs3)}
          </tr>
          <tr>
          {navsFunc(navs4)}
          </tr>
          <tr>
          {(weeks===5||weeks===6)? navsFunc(navs5) : ''}{(weeks===5)?generatePost():''}
          </tr>
          <tr>
          {(weeks===5)? navsFunc2():''}{generatePost2()}{generatePost3()}
          </tr>
          {/* остальные недели */}
        </tbody>
      </table>
    </div>
  )
}

Calendar.propTypes = {
  now: PropTypes.instanceOf(Date).isRequired
}

export default Calendar

