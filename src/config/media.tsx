import { createMedia } from "@artsy/fresnel";
import { TDisplay } from "./types";

const AppMedia = createMedia({
  breakpoints: {
    [TDisplay.mobile]: 0,
    [TDisplay.desktop]: 640,
    [TDisplay.large]: 1400,
    [TDisplay.extra]: 2500,
  },
});

// Make styles for injection into the header of the page
export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
