export const Logout = () => {
  localStorage.clear();
  // console.log("am i working ");
  window.location.replace('/');
};

// class Logout extends Component {
//   logout = e => {
//     //console.log(e);
//     localStorage.clear();
//     //console.log("am i working ");
//     window.location.replace('/');
//   };
//   render() {
//     return (
//       <div>
//         <Button
//           onClick={this.logout}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: 'inherit',
//           }}
//         >
//           Logout
//         </Button>
//       </div>
//     );
//   }
// }

// export default Logout;
