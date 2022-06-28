import { IPosition, IStar, TUiNumberStorage } from "../config/globals";
import { IStores } from "../stores/RootStore";
import { isMobile } from "./helpersBase";
import { entierAleatoire, range } from "./utils";

const REFERENCE_ANGLE = -90;
export const DELTA_ALPHA = 1;

export function polarToCartesian(
  distance: number,
  angleInDegrees: number
): IPosition {
  let angleInRadians = ((REFERENCE_ANGLE + angleInDegrees) * Math.PI) / 180.0;
  return {
    x: distance * Math.cos(angleInRadians),
    y: distance * Math.sin(angleInRadians),
  };
}

export function SVGMaxRadius(stores: IStores, hasMax = true): number {
  if (stores.baseStore.screen !== undefined) {
    const SVG_R_Max = stores.baseStore.GUI_CONFIG.display.layout.SVG_R_Max;
    const SVG_R_Ratio = stores.baseStore.GUI_CONFIG.display.layout.SVG_R_Ratio;
    const center = stores.baseStore.screen.center;
    const dim = stores.baseStore.GUI_CONFIG.display.knowbook_sizes.height;
    let R;
    if (isMobile(stores)) {
      R = (Math.min(center.x, center.y) - dim / 2) * SVG_R_Ratio;
    } else {
      R = (Math.min(center.x, center.y) - dim) * SVG_R_Ratio;
    }

    if (R > SVG_R_Max && hasMax) {
      R = SVG_R_Max;
    }
    return R;
  } else {
    return 400;
  }
}

export function setSVGGlobalDimensions(stores: IStores): void {
  stores.uiStore.setUiNumberStorage(TUiNumberStorage.R0, SVGMaxRadius(stores));
  stores.uiStore.setUiNumberStorage(
    TUiNumberStorage.SVGMaxElementCircle,
    SVGMaxElementCircle(stores)
  );
}

export function SVGMaxElementCircle(stores: IStores): number {
  const R = stores.uiStore.getUiNumberStorage(TUiNumberStorage.R0);
  const SVG_Element_Circle_Density =
    stores.baseStore.GUI_CONFIG.display.layout.SVG_Element_Circle_Density;
  const result = Math.trunc(
    (SVG_Element_Circle_Density * (2 * 3.14 * R)) /
      stores.baseStore.GUI_CONFIG.display.atom_sizes.height
  );
  return result;
}

// sliceArrayCascadeDisplayed(elements_all=[0,1,2,3,4,5,6,7],amountDisplayed=3,amountCascade=2,i=1) = [7,0,1,2,3]
export function sliceArrayCascadeDisplayed<T>(
  elements_all: T[],
  amountDisplayed: number,
  amountCascade: number,
  i: number
): T[] {
  if (elements_all === undefined || elements_all.length === 0) {
    return [];
  }
  const l = elements_all.length;

  let i_ = i;
  if (i_ >= l) {
    i_ = l;
    // return [];
  }
  if (amountDisplayed + amountCascade > l) {
    amountDisplayed = l;
    amountCascade = 0;
  }

  const indexes = range(l).map((idx) => {
    if (idx < i_) {
      return l + idx - i_;
    } else {
      return idx - i_;
    }
  });

  const elements_mobile = indexes.slice(0, amountDisplayed).map((idx) => {
    return elements_all[idx];
  });
  const elements_fix = indexes.slice(amountDisplayed, l).map((idx) => {
    return elements_all[idx];
  });
  const elements_cascade = elements_fix.slice(
    elements_fix.length - 1 - amountCascade
  );

  const elements: T[] = elements_cascade.concat(elements_mobile);

  return elements;
}

export function indexFromTick(tick: number, amountDisplayed: number): number {
  const alpha = 360 / amountDisplayed;
  const i = Math.floor((tick * DELTA_ALPHA) / alpha);
  return i;
}

export function stars(stores: IStores): IStar[] {
  const width = stores.baseStore.screen.width;
  const height = stores.baseStore.screen.height;
  const density_stars = 0.0005;
  const amount = Math.floor(width * height * density_stars);

  const stars: IStar[] = range(amount).map((ind) => {
    return {
      position: {
        x: entierAleatoire(0, width),
        y: entierAleatoire(0, height),
      },
      opacity: entierAleatoire(3, 10) / 10,
    };
  });

  return stars;
}
