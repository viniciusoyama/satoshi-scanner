// From https://github.com/SATO-Technologies/

import { sortRangesWithIndices, rangeOverlapsRange, cloneRanges, rangesSize, minRepr } from "./utils/ranges.js"

import {
  listMythic,
  listLegendary, 
  listEpic,
  listRare,
  listUncommon,
} from "./rare.js";

import {
  listFirstTx,
  listBlock9,
  listBlock78,
  listVintage,
  listPizza,
  listNakamoto,
  listPalindromes,
  listBlack,
  listAlpha,
  listOmega,
} from "./exotic.js";


// The order in the array is related to priority
// A pizza sat that is also uncommon is first extracted as an uncommon sat
const _typeByPriority = [
  // Rare
  { name: "mythic",     listingFunc: listMythic      },
  { name: "legendary",  listingFunc: listLegendary   },
  { name: "epic",       listingFunc: listEpic        },
  { name: "rare",       listingFunc: listRare        },
  { name: "uncommon",   listingFunc: listUncommon    },

  // Exotic
  { name: "black",      listingFunc: listBlack       },
  { name: "alpha",      listingFunc: listAlpha       },
  { name: "omega",      listingFunc: listOmega       },
  { name: "nakamoto",   listingFunc: listNakamoto    },
  { name: "palindrome", listingFunc: listPalindromes },
  { name: "firstTx",    listingFunc: listFirstTx     },
  { name: "block9",     listingFunc: listBlock9      },
  { name: "block78",    listingFunc: listBlock78     },
  { name: "vintage",    listingFunc: listVintage     },
  { name: "pizza",      listingFunc: listPizza       },
];

const SATRIBUTES = _typeByPriority.map(x => x.name);

const typeToListingFunc = {};

for (let type of _typeByPriority) {
  typeToListingFunc[type.name] = type.listingFunc;
}

export default function extractRareSatsRanges(ranges) {
  // This code assumes that the right side of a sat-range is inclusive.
  // The API returns ranges with the right side exclusive, so we subtract 1 from the right side.
  for (let r of ranges) {
    r[1] = r[1] - 1n;
  }

  let rareRanges = {};

  for (const satType in typeToListingFunc) {
    rareRanges[satType] = minRepr(typeToListingFunc[satType](cloneRanges(ranges)));  
  }
  
  return rareRanges;
}