import { createMedia } from "@artsy/fresnel";
import { ConfigDisplay } from "./types";

const AppMedia = createMedia({
  breakpoints: {
    [ConfigDisplay.mobile]: 0,
    [ConfigDisplay.desktop]: 640,
    [ConfigDisplay.large]: 1400,
    [ConfigDisplay.extra]: 2500,
  },
});

// Make styles for injection into the header of the page
export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
