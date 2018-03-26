$(document).ready(function () {
var chartData = generateChartData();

			function generateChartData() {
			  var chartData = [];
			  var firstDate = new Date( 2012, 0, 1 );
			  firstDate.setDate( firstDate.getDate() - 500 );
			  firstDate.setHours( 0, 0, 0, 0 );

			  for ( var i = 0; i < 500; i++ ) {
			    var newDate = new Date( firstDate );
			    newDate.setDate( newDate.getDate() + i );

			    var value = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;

			    chartData.push( {
			      date: newDate,
			      value: value
			    } );
			  }
			  return chartData;
			}


			var chart = AmCharts.makeChart( "chartdiv", {

			  type: "stock",
			  "theme": "light",
			 
			  dataSets: [ {
			    color: "#b0de09",
			    fieldMappings: [ {
			      fromField: "value",
			      toField: "value"
			    } ],
			    dataProvider: chartData,
			    categoryField: "date"
			  } ],

			  panels: [ {
			    showCategoryAxis: true,
			    title: "Today (7d.1m.3m.1y.YTD)",
			    eraseAll: false,
			    allLabels: [ {
			      x: 0,
			      y: 115,
			      text: "",
			      align: "center",
			      size: 16
			    } ],

			    stockGraphs: [ {
			      id: "g1",
			      valueField: "value",
			      useDataSetColors: false
			    } ],


			    stockLegend: {
			      valueTextRegular: " ",
			      markerType: "none"
			    },

			    drawingIconsEnabled: false
			  } ],

			  chartScrollbarSettings: {
			    graph: "g1"
			  },
			  chartCursorSettings: {
			    valueBalloonsEnabled: true
			  },
			  periodSelector: {
			    position: "bottom",
			    periods: [ {
			      period: "DD",
			      count: 10,
			      label: "10 days"
			    }, {
			      period: "MM",
			      count: 1,
			      label: "1 month"
			    }, {
			      period: "YYYY",
			      count: 1,
			      label: "1 year"
			    }, {
			      period: "YTD",
			      label: "YTD"
			    }, {
			      period: "MAX",
			      label: "MAX"
			    } ]
			  }
			} );
} );