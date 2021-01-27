import React from 'react'
import {Bar} from 'react-chartjs-2'
const ChartBarArea = ({country1,country2}) => {
    const dataForRender={
        datasets:[
            {
                label:`${country1.name}`,
                data:[country1.area],
                backgroundColor:['#0A375E'],
                borderColor:['orange'],
                pointBackgroundColor:['orange'],
                pointBorderColor:['green']
            },
            {
                label:`${country2.name}`,
                data:[country2.area],
                
                backgroundColor:['#BE058F'],
                borderColor:['orange'],
                pointBackgroundColor:['red'],
                pointBorderColor:['green']
            }
        ]
    }
    return (
        <div className='char-bar-item'  style={{backgroundColor:'beige',borderStyle: 'ridge',opacity:'1'}} >
            <Bar data={dataForRender} options={{
                responsive:true,
                title: {text:'Total area in square kilometres',display:true},
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

export default ChartBarArea
