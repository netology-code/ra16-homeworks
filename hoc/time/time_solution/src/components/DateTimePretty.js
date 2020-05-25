import React from 'react'
import PropTypes from 'prop-types'

function DateTimePretty(WrappedComponent, data) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {data: data}
            this.handleChangeDate = this.handleChangeDate.bind(this)
        }

        handleChangeDate(date) {
            const currentDate = new Date();
            const lastDate = new Date(date);
            let difference = ((currentDate.getTime() + 10800000) - lastDate.getTime());
            
            console.log(difference)

            const note = difference < 3600000 ? '12 минут назад' : 3600000 < difference && difference < 86400000 ? '5 часов назад' : `${Math.floor(difference/86400000)} дней назад`

            return note
        }

        render() {
            return <WrappedComponent date={this.handleChangeDate(this.state.data)}/>
        }
    }
}

export default DateTimePretty

