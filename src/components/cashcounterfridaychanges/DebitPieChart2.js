import React, { Component } from 'react';
 
import { LabeledArc } from './Arc';
 
class Piechart extends Component {
    constructor() {
        super();
 
        this.pie = d3.layout.pie()
                     .value((d) => d.value);
        this.colors = d3.scale.category10();
    }
 
    arcGenerator(d, i) {
        return (
            <LabeledArc key={`arc-${i}`}
                        data={d}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        color={this.colors(i)} />
        );
    }

 
    render() {
        let pie = this.pie(this.props.data),
            translate = `translate(${this.props.x}, ${this.props.y})`;
 
        return (
            <g transform={translate}>
                {pie.map((d, i) => this.arcGenerator(d, i))}
            </g>
        )
    }
}
 
export default Piechart;




// import React from "react";
// import { G } from "react-native-svg";
// import { Platform } from "react-native";
// import { VictoryLabel, VictoryContainer, NativeHelpers, Slice} from "victory-core-native";
// import { VictoryPie } from "victory-pie/src";

// export default class extends VictoryPie {
//   static defaultProps = {
//     ...VictoryPie.defaultProps,
//     dataComponent: <Slice />,
//     labelComponent: <VictoryLabel/>,
//     containerComponent: <VictoryContainer/>,
//     groupComponent: <G/>
//   };

//   renderGroup(children, style, offset) {
//     const { x, y } = offset;
//     const nativeStyle = NativeHelpers.getStyle(style);
//     return React.cloneElement(
//       this.props.groupComponent,
//       Object.assign({ role: "presentation", x, y }, nativeStyle),
//       children
//     );
//   }

//   shouldAnimate() {
//     return (Platform.OS === "android") ? false : Boolean(this.props.animate);
//   }
// }




// import * as React from "react";
// import { ScrollView, Easing } from "react-native";
 
// import Pie from "react-native-animated-pie";
 
// export default class PieExample extends React.Component {
//     render() {
//     const series = [40, 12, 68, 100, 25, 45, 200, 11];
//     const delay = 0;
//     return (
//       <ScrollView>
//         <Pie
//           series={series.map(d => d).sort((a, b) => b - a)}
//           height={380}
//           outerRadius={100}
//           easing={Easing.linear}
//           delay={delay}
//         />
//         <Pie
//           series={series.map(d => d).sort((a, b) => a - b)}
//           outerRadius={100}
//           height={200}
//           innerRadius={55}
//           delay={delay + 1000}
//           easing={Easing.circle}
//         />
//       </ScrollView>
//     );
//   }
// }