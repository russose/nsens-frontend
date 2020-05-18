import { SyntheticEvent } from "react";
import { observer } from "mobx-react";
import { Image, Box, IconButton, Mask } from "gestalt";
import { AtomID } from "../../types";
import { USER_DISPLAY } from "../../config";
import { JsText } from "../js_components";

interface IAtomCardGenericProps {
  id: AtomID;
  title: string;
  image_url: string;
  saved_enabled: boolean;
  saved_desactivated: boolean;
  saved_handler: (args: { event: SyntheticEvent<any> }) => void;
  edit_handler: any;
}

// const width_screen = window.innerWidth;
// const height_screen = window.innerHeight;
// console.log(width_screen, height_screen);

const title_card_size = USER_DISPLAY.title_card_size;
const padding_grid: any = USER_DISPLAY.padding_grid;
const size_icon: any = USER_DISPLAY.size_icon;

const AtomCardGeneric__: React.FunctionComponent<IAtomCardGenericProps> = (
  props
) => {
  return (
    <Box padding={padding_grid} height="30vh" column={3}>
      <Box height="100%" width="100%">
        <Mask rounding={6} height="100%" width="100%">
          <Box
            //color="red"
            // display="flex"
            // direction="column"
            // justifyContent="center"
            // height="100"

            height="100%"
            width="100%"

            // flex="grow"
            // fit={true}
          >
            <Image
              alt="image"
              color="white"
              fit="cover"
              naturalHeight={1}
              naturalWidth={1}
              loading="auto"
              src={props.image_url}
            >
              <Box
                //color="transparent"
                display="flex"
                direction="column"
                justifyContent="between"
                height="100%"
                padding={0}
              >
                <Box padding={2}>
                  <JsText size={title_card_size} align="center" weight="bold">
                    {props.title}
                  </JsText>
                </Box>

                <Box
                  display="flex"
                  direction="row"
                  justifyContent="end"
                  padding={2}
                  //color="white"
                >
                  <Box paddingX={2}>
                    {props.saved_enabled && (
                      <IconButton
                        accessibilityLabel="edit"
                        icon="edit"
                        iconColor="darkGray"
                        bgColor="transparentDarkGray"
                        size={size_icon}
                        onClick={props.edit_handler}
                      />
                    )}
                  </Box>
                  <Box paddingX={1}>
                    <IconButton
                      accessibilityLabel="save"
                      icon="angled-pin"
                      iconColor={props.saved_enabled ? "red" : "darkGray"}
                      bgColor="transparentDarkGray"
                      size={size_icon}
                      onClick={props.saved_handler}
                      disabled={props.saved_desactivated}
                    />
                  </Box>
                </Box>
              </Box>
            </Image>
          </Box>
        </Mask>
      </Box>
    </Box>
  );
};

export default observer(AtomCardGeneric__);

// <Box
// color="orange"
// // display="flex"
// // direction="column"
// // //justifyContent="between"
// // alignItems="center"
// // borderSize="lg"
// rounding={6}
// padding={3}
// height="30vh"
// //width={2 * card_dim}
// // fit={true}
// // flex="grow"

// // minWidth={150}
// //maxWidth={card_dim}
// >
// {/* <Box padding={1}>
//   <JsText align="center" size={title_card_size} weight="bold">
//     {props.title}
//   </JsText>
// </Box> */}

// {/* <Mask rounding={6} height="100%" width="100%"> */}
//   {/* <Letterbox height={card_dim} width={card_dim} contentAspectRatio={1}> */}
//   <Box
//     color="red"
//     // display="flex"
//     // direction="column"
//     // justifyContent="center"
//     // height="100"
//     height="80%"
//     width="100%"

//     // flex="grow"
//     // fit={true}
//   >
//     {/* <Box color="navy" height={200}></Box> */}

//     <Image
//       alt="image"
//       color="transparent"
//       fit="cover"
//       naturalHeight={1}
//       naturalWidth={1}
//       loading="auto"
//       src={props.image_url}
//     >
//       <Box padding={1}>
//         <JsText align="center" size={title_card_size} weight="bold">
//           {props.title}
//         </JsText>
//       </Box>
//     </Image>
//   </Box>
//   {/* </Letterbox> */}
// {/* </Mask> */}

// <Box display="flex" direction="row" justifyContent="end" padding={0}>
//   <Box paddingX={2}>
//     {props.saved_enabled && (
//       <IconButton
//         accessibilityLabel="edit"
//         icon="edit"
//         iconColor="darkGray"
//         bgColor="transparent"
//         size={size_icon}
//         onClick={props.edit_handler}
//       />
//     )}
//   </Box>
//   <Box paddingX={1}>
//     <IconButton
//       accessibilityLabel="save"
//       icon="angled-pin"
//       iconColor={props.saved_enabled ? "red" : "darkGray"}
//       bgColor="transparent"
//       size={size_icon}
//       onClick={props.saved_handler}
//       disabled={props.saved_desactivated}
//     />
//   </Box>
// </Box>
// </Box>
// </Box>
