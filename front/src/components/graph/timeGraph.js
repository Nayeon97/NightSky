import ReactApexChart from 'react-apexcharts';

const TimeGraph = (props) => {
  const data = props.data;
  //도넛 차트 데이터 및 옵션

  const timeData = {
    series: [
      {
        name: '작성 일기 수 ',
        data: [data.morning, data.afternoon, data.night, data.dawn], //data.morning, data.afternoon, data.night, data.dawn
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#FFEC99', '#A5D8FF', '#FFADAD', '#BDB2FF'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',

      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    xaxis: {
      categories: ['아침', '점심', '저녁', '새벽'],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: '',
      align: 'left',
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={timeData}
          series={timeData.series}
          type="bar"
          width="400"
        />
      </div>
    </div>
  );
};

export default TimeGraph;
