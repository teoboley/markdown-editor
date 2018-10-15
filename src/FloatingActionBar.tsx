// import * as React from "react";
// import ActionBar, { ActionBarProps } from "../ActionBar";
// import * as Color from "color";
// import { Grow } from "@material-ui/core";
//
// export type FloatingActionBarProps = ActionBarProps & {
//   ref?: any;
// }
//
// type FloatingActionBarState = {
//   disabled: boolean;
//   left: number;
//   top: number;
// }
//
//
// class FloatingActionBar extends React.Component<FloatingActionBarProps, FloatingActionBarState> {
//   readonly state = {
//     top: -10000,
//     left: -10000,
//     disabled: true
//   };
//
//   render() {
//       return <Grow in={!this.state.disabled}>
//         <span style={{
//           position: "absolute",
//           zIndex: !this.state.disabled ? 900 : -999,
//           top: this.state.top,
//           left: this.state.left,
//           boxShadow: `0 3px 5px 2px ${Color('black').fade(0.8)}`,
//           transition: 'left 0.75s'
//         }}>
//           <ActionBar {...this.props}/>
//         </span>
//       </Grow>
//   }
//
//   public moveTo(left?: number, top?: number) {
//     this.setState(prevState => ({
//       left: left || prevState.left,
//       top: top || prevState.top,
//       disabled: false
//     }));
//   }
//
//   public disable() {
//     this.setState({
//       disabled: true
//     })
//   }
// }
//
//
// export default FloatingActionBar;