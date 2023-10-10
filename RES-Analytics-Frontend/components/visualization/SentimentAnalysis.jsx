'use client'
import React from 'react'
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import SubMenuSentiment from '@components/utils/SubMenuSentiment'
import Filter from '@components/filters/SentimentAnalysis'
import { Line, Doughnut } from 'react-chartjs-2';
import Spinner from '@components/common/Spinner';
import dayjs from 'dayjs';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { TagCloud } from 'react-tagcloud'


import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const options = {
    hue: '#46b3c2',
}


const doughnutOptions = {
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                usePointStyle: true,
            }
        },
        tooltip: {
            enabled: false
        }
    },
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
};

function lineOptionsFunction() {
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 2
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: 'black',
                },
            },
            title: {
                display: false,
                text: '',
                color: 'black',
                font: {
                    size: 20,
                    family: 'inter'
                },
                padding: {
                    bottom: 30
                }
            },
        },
        scales: {
            y: {
                ticks: {
                    color: 'black'
                }
            },
            x: {
                ticks: {
                    color: 'black',
                    autoSkip: true,
                    autoSkipPadding: 2,
                    maxRotation: 0,
                    maxTicksLimit: 8,

                },
                type: 'time',
                time: {
                    parser: 'YYYY-MM-DD',
                    displayFormats: {
                        month: 'YYYY-MM',
                        day: 'YYYY-MM-DD',
                    },
                    tooltipFormat: 'YYYY-MM-DD'
                }
            },
        },

    };
    return lineOptions
}

function getDatesBetween(startDate, endDate) {
    var sdate = new Date(startDate)
    var edate = new Date(endDate)
    const currentDate = new Date(sdate.getTime())
    const dates = [];
    while (currentDate <= edate) {

        dates.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

function createDataset(entityName, valueList, col) {

    const dataset = {
        label: entityName,
        data: valueList,
        spanGaps: true,
        borderColor: col,
        backgroundColor: col,
    }
    return dataset
}

function createDoughnutState(dataset) {

    var dataList = []
    var labelList = []
    var backgroundColor = ['green', 'red']
    for (let index = 0; index < dataset.length; index++) {
        const element = dataset[index]
        const sum = element.data.reduce((partialSum, a) => partialSum + a, 0);
        dataList.push(sum)
        labelList.push(element.label + ': ')
    }

    var total = dataList.reduce((accumulator, currentValue) => accumulator + currentValue)
    var tempLabelList = dataList.map(value => Math.round((value / total) * 100) + '%')
    var labelList = labelList.map(function (item, index) {
        return item + tempLabelList[index]
    });

    const dataSet = {
        label: labelList,
        data: dataList,
        backgroundColor: backgroundColor,
    }
    return [[dataSet], labelList]
}

function labelsFilter(sentiment, entityLabelsList, countryLabelsList, sourceLabelsList, tempLabels, primaryDatasets, jsonDict) {

    var dataset = []

    if (entityLabelsList.length != 0 && countryLabelsList.length != 0 && sourceLabelsList.length != 0) {
        var positiveList = []
        var negativeList = []
        for (var i = 0; i < tempLabels.length; i++) {
            var countPositive = 0
            var countNegative = 0
            var valList = jsonDict[tempLabels[i]]
            for (var j = 0; j < valList.length; j++) {
                var tempEntity = valList[j][0]
                var tempCountry = valList[j][1]
                var tempSource = valList[j][2]
                var tempSentiment = valList[j][4]

                if (entityLabelsList.includes(tempEntity) && countryLabelsList.includes(tempCountry) && sourceLabelsList.includes(tempSource)) {
                    if (tempSentiment == 'Positive') {
                        countPositive += 1
                    } else if (tempSentiment == 'Negative') {
                        countNegative += 1
                    }
                }
            }
            positiveList.push(countPositive)
            negativeList.push(countNegative)
        }
        for (let index = 0; index < sentiment.length; index++) {
            if (sentiment[index] == 'Positive') {
                dataset.push(createDataset('Positive', positiveList, 'green'))
            } else if (sentiment[index] == 'Negative') {
                dataset.push(createDataset('Negative', negativeList, 'red'))
            }
        }

        return dataset
    } else {
        return primaryDatasets
    }
}


export default function Page() {

    const format = 'YYYY-MM-DD';

    var tempLabels = []
    var tempDatasets = []

    // endpoints
    var endPointSA = 'https://nmcao11.pythonanywhere.com/sa'
    var endPointWordCloud = 'https://nmcao11.pythonanywhere.com/wordcloud'

    // dates
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // tempDates
    const [tempStartDate, setTempStartDate] = React.useState(startDate);
    const [tempEndDate, setTempEndDate] = React.useState(endDate);

    // dataset
    const [primaryLabels, setPrimaryLabels] = React.useState({});
    const [primaryDatasets, setPrimaryDatasets] = React.useState({});

    // filters
    const [entityLabelsList, setEntityLabelsList] = React.useState([]);
    const [countryLabelsList, setCountryLabelsList] = React.useState([]);
    const [sourceLabelsList, setSourceLabelsList] = React.useState([]);
    const [sentiment, setSentiment] = React.useState(['Positive', 'Negative']);

    // tempFilters
    const [tempEntityLabelsList, setTempEntityLabelsList] = React.useState(entityLabelsList);
    const [tempCountryLabelsList, setTempCountryLabelsList] = React.useState(countryLabelsList);
    const [tempSourceLabelsList, setTempSourceLabelsList] = React.useState(sourceLabelsList);

    // states
    const [doughnutState, setDoughnutState] = React.useState({})
    const [state, setState] = React.useState({})
    const [jsonDict, setJsonDict] = React.useState({})
    const [wordcloudDict, setWordcloudDict] = React.useState([])

    // spinner
    const [isLoading, setIsLoading] = React.useState(false)

    const handleReset = () => {
        setTempStartDate(dayjs(startDate));
        setTempEndDate(dayjs(endDate));
        setTempEntityLabelsList(entityLabelsList)
        setTempCountryLabelsList(countryLabelsList)
        setTempSourceLabelsList(sourceLabelsList)

        tempLabels = primaryLabels
        tempDatasets = primaryDatasets

        setDoughnutState({
            labels: createDoughnutState(tempDatasets)[1],
            datasets: createDoughnutState(tempDatasets)[0]
        })
        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    const handleUpdate = (tempLabels, tempDatasets) => {
        var firstIndex = primaryLabels.indexOf(tempStartDate.format(format).toString())
        var lastIndex = primaryLabels.indexOf(tempEndDate.format(format).toString())
        tempLabels = primaryLabels.slice(firstIndex, lastIndex + 1)

        tempDatasets = labelsFilter(sentiment, tempEntityLabelsList, tempCountryLabelsList, tempSourceLabelsList, tempLabels, primaryDatasets, jsonDict)
        setDoughnutState({
            labels: createDoughnutState(tempDatasets)[1],
            datasets: createDoughnutState(tempDatasets)[0]
        })
        setState({
            labels: tempLabels,
            datasets: tempDatasets
        })
    }

    function chartVisualization() {
        React.useMemo(async () => {

            setIsLoading(true)

            fetch(endPointSA, { cache: "no-store" })
                .then(response => response.json())
                .then(data => {
                    var result = JSON.parse(JSON.stringify(data))
                    // initialize temp JSON dict
                    var tempJsonDict = {}

                    // initialize sets for the filter component
                    var entitySet = new Set()
                    var countrySet = new Set()
                    var sourceSet = new Set()

                    //create the full date range, from start to end date
                    var sDate = result[0].review_date
                    var eDate = result.slice(-1)[0].review_date
                    var fullDateList = getDatesBetween(sDate, eDate)
                    //// const d = result.map((item) => item.review_date)
                    for (var i = 0; i < fullDateList.length; i++) {
                        if (!tempJsonDict[fullDateList[i]]) {
                            tempJsonDict[fullDateList[i]] = [];
                        }
                    }

                    // create tempJson and filter sets
                    for (var i = 0; i < result.length; i++) {
                        var val = [result[i].entity, result[i].country, result[i].source, result[i].text_blob, result[i].vader_boolean]
                        entitySet.add(result[i].entity)
                        countrySet.add(result[i].country)
                        sourceSet.add(result[i].source)
                        if (!tempJsonDict[result[i].review_date]) {
                            tempJsonDict[result[i].review_date] = [];
                        }
                        tempJsonDict[result[i].review_date].push(val);
                    }

                    // assign variables to states
                    setJsonDict(tempJsonDict)


                    setEntityLabelsList(Array.from(entitySet))
                    setTempEntityLabelsList(Array.from(entitySet))

                    setCountryLabelsList(Array.from(countrySet))
                    setTempCountryLabelsList(Array.from(countrySet))

                    setSourceLabelsList(Array.from(sourceSet))
                    setTempSourceLabelsList(Array.from(sourceSet))

                    tempLabels = Object.keys(tempJsonDict)

                    // create the dataset that will be used in visualization
                    var positiveList = []
                    var negativeList = []
                    for (var i = 0; i < tempLabels.length; i++) {
                        var countPositive = 0
                        var countNegative = 0
                        var valList = tempJsonDict[tempLabels[i]]
                        for (var j = 0; j < valList.length; j++) {
                            var sent = tempJsonDict[tempLabels[i]][j][4]
                            if (sent == 'Positive') {
                                countPositive += 1
                            } else if (sent == 'Negative') {
                                countNegative += 1
                            }
                        }
                        positiveList.push(countPositive)
                        negativeList.push(countNegative)
                    }
                    tempDatasets.push(createDataset('Positive', positiveList, 'green'))
                    tempDatasets.push(createDataset('Negative', negativeList, 'red'))

                    setPrimaryLabels(tempLabels)
                    setPrimaryDatasets(tempDatasets)

                    setStartDate(dayjs(String(tempLabels.slice(0, 1))))
                    setEndDate(dayjs(String(tempLabels.slice(-1))))

                    setTempStartDate(dayjs(String(tempLabels.slice(0, 1))))
                    setTempEndDate(dayjs(String(tempLabels.slice(-1))))


                    setDoughnutState({
                        labels: createDoughnutState(tempDatasets)[1],
                        datasets: createDoughnutState(tempDatasets)[0]
                    })

                    setState({
                        labels: tempLabels,
                        datasets: tempDatasets
                    })

                    setIsLoading(false)

                })
        }, [])
        
        return (
            <><Box sx={{
                ml: '25vw',
                mb: '-5vh',
                display: 'flex',
            }}>

            </Box>
                <Filter
                    tempStartDate={tempStartDate}
                    tempEndDate={tempEndDate}

                    setTempStartDate={setTempStartDate}
                    setTempEndDate={setTempEndDate}

                    handleUpdate={handleUpdate}
                    handleReset={handleReset}

                    startDate={startDate}
                    endDate={endDate}

                    entityLabelsList={entityLabelsList}
                    tempEntityLabelsList={tempEntityLabelsList}
                    setTempEntityLabelsList={setTempEntityLabelsList}

                    countryLabelsList={countryLabelsList}
                    tempCountryLabelsList={tempCountryLabelsList}
                    setTempCountryLabelsList={setTempCountryLabelsList}

                    sourceLabelsList={sourceLabelsList}
                    tempSourceLabelsList={tempSourceLabelsList}
                    setTempSourceLabelsList={setTempSourceLabelsList} /><Box height='80vh' display='flex' justifyContent="center">
                    <Box width={'30%'} height={'70%'} mr={5}>
                        <Doughnut options={doughnutOptions} data={doughnutState} />
                    </Box>

                    <Box width={'70%'} height={'70%'}>
                        <Line options={lineOptionsFunction()} data={state} />
                    </Box>
                </Box></>
        )
    }

    {/* 
    function wordCloudVisualization() {

        React.useMemo(async () => {

            fetch(endPointWordCloud, { cache: "no-store" })
                .then(response => response.json())
                .then(data => {
                    var result = JSON.parse(JSON.stringify(data))
                    setWordcloudDict(result)
                })
        }, [])

        return (
            <Box display="flex"
                justifyContent="center"
                minHeight="100vh">
                <Box width={'50vw'} display="flex"
                    justifyContent="center">
                    <TagCloud
                        minSize={20}
                        maxSize={55}
                        colorOptions={options}
                        tags={wordcloudDict}
                        onClick={(tag) => console.log('clicking on tag:', tag)}
                    />
                </Box>
            </Box>
        )
    }
    */}
    

    if (isLoading) {
        return <Box display={'flex'} justifyContent={'center'}><Spinner lg /></Box>
    }

    return (
        <Container sx={{ py: '3vh' }} maxWidth="xl" width='xl'>
            <SubMenuSentiment chartVisualization={chartVisualization()}  />
        </Container>

    )
    // wordCloudVisualization={wordCloudVisualization()}
}
