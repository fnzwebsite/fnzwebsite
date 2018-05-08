import React, { Component } from "react";

import { Chart } from "react-google-charts";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        legend: true,
        hAxis: {
          title: "Time"
        },
        vAxis: {
          title: "Air Passengers"
        }
      },

      rows: [
        [1949, 11],
        [1949.08333333333, 11],
        [1949.16666666667, 13],
        [1949.25, 12],
        [1949.33333333333, 12],
        [1949.41666666667, 13],
        [1949.5, 14],
        [1949.58333333333, 14],
        [1949.66666666667, 136],
        [1949.75, 119],
        [1949.83333333333, 104],
        [1949.91666666667, 118],
        [1950, 115],
        [1950.08333333333, 126],
        [1950.16666666667, 141],
        [1950.25, 135],
        [1950.33333333333, 125],
        [1950.41666666667, 149],
        [1950.5, 170],
        [1950.58333333333, 170],
        [1950.66666666667, 158],
        [1950.75, 133],
        [1950.83333333333, 114],
        [1950.91666666667, 140],
        [1951, 145],
        [1951.08333333333, 150],
        [1951.16666666667, 178],
        [1951.25, 163],
        [1951.33333333333, 172],
        [1951.41666666667, 178],
        [1951.5, 199],
        [1951.58333333333, 199],
        [1951.66666666667, 184],
        [1951.75, 162],
        [1951.83333333333, 146],
        [1951.91666666667, 166],
        [1952, 171],
        [1952.08333333333, 180],
        [1952.16666666667, 193],
        [1952.25, 181],
        [1952.33333333333, 183],
        [1952.41666666667, 218],
        [1952.5, 230],
        [1952.58333333333, 242],
        [1952.66666666667, 209],
        [1952.75, 191],
        [1952.83333333333, 172],
        [1952.91666666667, 194],
        [1953, 196],
        [1953.08333333333, 196],
        [1953.16666666667, 236],
        [1953.25, 235],
        [1953.33333333333, 229],
        [1953.41666666667, 243],
        [1953.5, 264],
        [1953.58333333333, 272],
        [1953.66666666667, 237],
        [1953.75, 211],
        [1953.83333333333, 180],
        [1953.91666666667, 201],
        [1954, 204],
        [1954.08333333333, 188],
        [1954.16666666667, 235],
        [1954.25, 227],
        [1954.33333333333, 234],
        [1954.41666666667, 264],
        [1954.5, 302],
        [1954.58333333333, 293],
        [1954.66666666667, 259],
        [1954.75, 229],
        [1954.83333333333, 203],
        [1954.91666666667, 229],
        [1955, 242],
        [1955.08333333334, 233],
        [1955.16666666667, 267],
        [1955.25, 269],
        [1955.33333333334, 270],
        [1955.41666666667, 315],
        [1955.5, 364],
        [1955.58333333334, 347],
        [1955.66666666667, 312],
        [1955.75, 274],
        [1955.83333333334, 237],
        [1955.91666666667, 278],
        [1956, 284],
        [1956.08333333334, 277],
        [1956.16666666667, 317],
        [1956.25, 313],
        [1956.33333333334, 318],
        [1956.41666666667, 374],
        [1956.5, 413],
        [1956.58333333334, 405],
        [1956.66666666667, 355],
        [1956.75, 306],
        [1956.83333333334, 271],
        [1956.91666666667, 306],
        [1957, 315],
        [1957.08333333334, 301],
        [1957.16666666667, 356],
        [1957.25, 348],
        [1957.33333333334, 355],
        [1957.41666666667, 422],
        [1957.5, 465],
        [1957.58333333334, 467],
        [1957.66666666667, 404],
        [1957.75, 347],
        [1957.83333333334, 305],
        [1957.91666666667, 336],
        [1958, 340],
        [1958.08333333334, 318],
        [1958.16666666667, 362],
        [1958.25, 348],
        [1958.33333333334, 363],
        [1958.41666666667, 435],
        [1958.5, 491],
        [1958.58333333334, 505],
        [1958.66666666667, 404],
        [1958.75, 359],
        [1958.83333333334, 310],
        [1958.91666666667, 337],
        [1959, 360],
        [1959.08333333334, 342],
        [1959.16666666667, 406],
        [1959.25, 396],
        [1959.33333333334, 420],
        [1959.41666666667, 472],
        [1959.5, 548],
        [1959.58333333334, 559],
        [1959.66666666667, 463],
        [1959.75, 407],
        [1959.83333333334, 362],
        [1959.91666666667, 405],
        [1960, 417],
        [1960.08333333334, 391],
        [1960.16666666667, 419],
        [1960.25, 461],
        [1960.33333333334, 472],
        [1960.41666666667, 535],
        [1960.5, 622],
        [1960.58333333334, 606],
        [1960.66666666667, 508],
        [1960.75, 461],
        [1960.83333333334, 390],
        [1960.91666666667, 432]
      ],

      columns: [
        {
          label: "time",
          type: "number",
          p: {}
        },
        {
          label: "Air Passengers",
          type: "number"
        }
      ]
    };
  }
  render() {
    return (
      <Chart
        chartType="LineChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="LineChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    );
  }
}
export default ChangePassword;
