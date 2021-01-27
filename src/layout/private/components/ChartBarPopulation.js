import React from 'react'
import {Bar} from 'react-chartjs-2'

const ChartBar = ({country1,country2}) => {
    const dataForRender={
        datasets:[
            {
                label:`${country1.name}`,
                data:[country1.population/1000000],
                backgroundColor:['#6B7A8F'],
                borderColor:['orange'],
                pointBackgroundColor:['orange'],
                pointBorderColor:['green']
            },
            {
                label:`${country2.name}`,
                data:[country2.population/1000000],
                backgroundColor:['#F7882F'],
                borderColor:['orange'],
                pointBackgroundColor:['orange'],
                pointBorderColor:['green']
            }
        ]
    }
    return (
        <div className='char-bar-item'  style={{backgroundColor:'beige',borderStyle: 'ridge',opacity:'1'}} >
            <Bar data={dataForRender} options={{
                responsive:true,
                title: {text:'Population in millions',display:true},
                scales:{
                    yAxes:[
                        {
                            ticks:{
                                autoSkip:true,
                                maxTicksLimit:100000,
                                beginAtZero:true
                            },
                            gridLines:{
                                display:false
                            }
                        }
                    ],
                    xAxes:[
                        {
                            gridLines:{
                                display:false
                            }
                        }
                    ]
                }
            }}/>
        </div>
    )
}

export default ChartBar
