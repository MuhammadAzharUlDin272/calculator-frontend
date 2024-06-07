import { createSlice } from "@reduxjs/toolkit";
import { calculateCranePrice } from "../utils";

const initialState = {
  items: [],
  baseline: {
    originaddress: "",
    originfloor: 1,
    originelevator: "yes",
    origintruckAccess: "easy",
    destinationaddress: "",
    destinationfloor: 1,
    destinationelevator: "yes",
    destinationtruckAccess: "easy",
  },
  boxes: 0,
  packagedItems: [],
  assembledItems: [],
  disassembledItems: [],
  storageItems: [],
  storagePeriod: {
    startDay: "",
    endDay: "",
  },
  craneItems: [],
  totalPrice: 0,
  servicesPrice: 0,
  distancePrice: 0,
  boxesPrice: 0,
  itemsPrice: 0,
  distanceInKm: 0, // Add distanceInKm to the initial state
  originfloorprice: 0, // Initialize originfloorprice
  destinationfloorprice: 0, // Initialize destinationfloorprice
  origintruckaccessprice: 0,
  destinationtruckaccessprice: 0,
  originCranePrice: 0,
  destinationCranePrice: 0,
  packingprice:0
};

export const mainSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    resetState: () => initialState,
    addItems: (state, action) => {
      const newItems = action.payload.filter(
        (newItem) =>
          !state.items.some(
            (existingItem) => existingItem.name === newItem.name
          )
      );
      state.items.push(...newItems);
    },

    addBaseline: (state, action) => {
      const {
        originaddress,
        originfloor,
        originelevator,
        origintruckAccess,
        destinationaddress,
        destinationfloor,
        destinationelevator,
        destinationtruckAccess,
      } = action.payload;
      state.baseline = {
        originaddress,
        originfloor,
        originelevator,
        origintruckAccess,
        destinationaddress,
        destinationfloor,
        destinationelevator,
        destinationtruckAccess,
      };
    },

    addBoxes: (state, action) => {
      state.boxes = action.payload;
    },

    addPackagedItems: (state, action) => {
      const newPackagedItems = action.payload.filter(
        (newItem) =>
          !state.packagedItems.some(
            (existingItem) => existingItem.name === newItem.name
          )
      );
      state.packagedItems.push(...newPackagedItems);
    },

    changeItemQuantity: (state, action) => {
      const { name, change } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.name === name);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += change;
      }
    },

    changePackagedItemQuantity: (state, action) => {
      const { name, change } = action.payload;
      const packagedItemIndex = state.packagedItems.findIndex(
        (item) => item.name === name
      );
      if (packagedItemIndex !== -1) {
        state.packagedItems[packagedItemIndex].quantity += change;
      }
    },

    removeItem: (state, action) => {
      const { item } = action.payload;
      state.items = state.items.filter((i) => i.name !== item.name);
    },

    removePackagedItem: (state, action) => {
      const { item } = action.payload;
      state.packagedItems = state.packagedItems.filter(
        (i) => i.name !== item.name
      );
    },

    addAssembledItems: (state, action) => {
      const newAssembledItems = action.payload.filter(
        (newItem) =>
          !state.assembledItems.some(
            (existingItem) => existingItem.name === newItem.name
          )
      );
      state.assembledItems.push(...newAssembledItems);
    },

    changeAssembledItemQuantity: (state, action) => {
      const { name, change } = action.payload;
      const assembledItemIndex = state.assembledItems.findIndex(
        (item) => item.name === name
      );
      if (assembledItemIndex !== -1) {
        state.assembledItems[assembledItemIndex].quantity += change;
      }
    },

    removeAssembledItem: (state, action) => {
      const { item } = action.payload;
      state.assembledItems = state.assembledItems.filter(
        (i) => i.name !== item.name
      );
    },

    addDisassembledItems: (state, action) => {
      const newDisassembledItems = action.payload.filter(
        (newItem) =>
          !state.disassembledItems.some(
            (existingItem) => existingItem.name === newItem.name
          )
      );
      state.disassembledItems.push(...newDisassembledItems);
    },

    changeDisassembledItemQuantity: (state, action) => {
      const { name, change } = action.payload;
      const disassembledItemIndex = state.disassembledItems.findIndex(
        (item) => item.name === name
      );
      if (disassembledItemIndex !== -1) {
        state.disassembledItems[disassembledItemIndex].quantity += change;
      }
    },

    removeDisassembledItem: (state, action) => {
      const { item } = action.payload;
      state.disassembledItems = state.disassembledItems.filter(
        (i) => i.name !== item.name
      );
    },

    addCraneItems: (state, action) => {
      const newCraneItems = action.payload
        .filter(
          (newItem) =>
            !state.craneItems.some(
              (existingItem) => existingItem.name === newItem.name
            )
        )
        .map((newItem) => ({
          ...newItem,
          price:
            calculateCranePrice(parseInt(state.baseline.originfloor)) +
            calculateCranePrice(parseInt(state.baseline.destinationfloor)),
        }));
      state.craneItems.push(...newCraneItems);
    },

    changeCraneItemQuantity: (state, action) => {
      const { name, change } = action.payload;
      const craneItemIndex = state.craneItems.findIndex(
        (item) => item.name === name
      );
      if (craneItemIndex !== -1) {
        state.craneItems[craneItemIndex].quantity += change;
      }
    },

    removeCraneItem: (state, action) => {
      const { item } = action.payload;
      state.craneItems = state.craneItems.filter((i) => i.name !== item.name);
    },

    addStorageItems: (state, action) => {
      const newStorageItems = action.payload.filter(
        (newItem) =>
          !state.storageItems.some(
            (existingItem) => existingItem.name === newItem.name
          )
      );
      state.storageItems.push(...newStorageItems);
    },

    changeStorageItemQuantity: (state, action) => {
      const { name, change } = action.payload;
      const storageItemIndex = state.storageItems.findIndex(
        (item) => item.name === name
      );
      if (storageItemIndex !== -1) {
        state.storageItems[storageItemIndex].quantity += change;
      }
    },

    removeStorageItem: (state, action) => {
      const { item } = action.payload;
      state.storageItems = state.storageItems.filter(
        (i) => i.name !== item.name
      );
    },

    setStorageStartDay: (state, action) => {
      state.storagePeriod.startDay = action.payload;
    },

    setStorageEndDay: (state, action) => {
      state.storagePeriod.endDay = action.payload;
    },

    calculate: (state, action) => {
      const {
        baseline,
        boxes,
        packagedItems,
        assembledItems,
        disassembledItems,
        storageItems,
        craneItems,
        distance,
        distanceInKm,
      } = action.payload;

      

      // Calculate total price for all items
      let totalPrice = 0;
      let servicesPrice = 0;
      let distancePrice = distance;
      let boxesPrice = 0;
      let itemsPrice = 0;
      let originfloorprice = 0; // Initialize originfloorprice
      let destinationfloorprice = 0; // Initialize destinationfloorprice
      let origintruckaccessprice = 0;
      let destinationtruckaccessprice = 0;
      let originCranePrice = 0;
      let destinationCranePrice = 0;
      let packingprice=0;

      // Calculate total price for items
      if (state.items) {
        state.items.forEach((item) => {
          itemsPrice += item.quantity * item.price;
          // Calculate additional cost based on elevator for origin floor
          if (baseline.originelevator === "no") {
            const additionalPrice =
              item.quantity * item.price * (baseline.originfloor * 0.1);
            itemsPrice += additionalPrice;
            originfloorprice += additionalPrice;
          }

          // Calculate additional cost based on elevator for destination floor
          if (baseline.destinationelevator === "no") {
            const additionalPrice =
              item.quantity * item.price * (baseline.destinationfloor * 0.1);
            itemsPrice += additionalPrice;
            destinationfloorprice += additionalPrice;
          }

          // Calculate additional cost based on truck accessibility for origin
          if (baseline.origintruckAccess === "medium") {
            const additionalPrice = item.quantity * item.price * 0.1;
            itemsPrice += additionalPrice;
            origintruckaccessprice += additionalPrice;
          } else if (baseline.origintruckAccess === "hard") {
            const additionalPrice = item.quantity * item.price * 0.15;
            itemsPrice += additionalPrice;
            origintruckaccessprice += additionalPrice;
          }

          // Calculate additional cost based on truck accessibility for origin
          if (baseline.destinationtruckAccess === "medium") {
            const additionalPrice = item.quantity * item.price * 0.1;
            itemsPrice += additionalPrice;
            destinationtruckaccessprice += additionalPrice;
          } else if (baseline.destinationtruckAccess === "hard") {
            const additionalPrice = item.quantity * item.price * 0.15;
            itemsPrice += additionalPrice;
            destinationtruckaccessprice += additionalPrice;
          }
        });
      }

      // Calculate total price for crane items
      if (state.craneItems) {
        state.craneItems.forEach((item) => {
          servicesPrice += item.quantity * item.price;
        });

        // Calculate crane service price for origin
        if (baseline.originfloor > 1) {
          originCranePrice = calculateCranePrice(
            baseline.originfloor,
            craneItems
          );
          servicesPrice += originCranePrice;
        }

        // Calculate crane service price for destination
        if (baseline.destinationfloor > 1) {
          destinationCranePrice = calculateCranePrice(
            baseline.destinationfloor,
            craneItems
          );
          servicesPrice += destinationCranePrice;
        }
      }

      // Calculate total price for packaged items
      if (packagedItems) {
        packagedItems.forEach((item) => {
          packingprice += item.quantity * item.price * 1.1; // 10% additional cost for packaging
          servicesPrice += item.quantity * item.price * 1.1; // 10% additional cost for packaging
        });
      }

      // Calculate total price for assembled items
      if (assembledItems) {
        assembledItems.forEach((item) => {
          servicesPrice += item.quantity * item.price * 2; // Assume assembling and disassembling cost the same
        });
      }

      // Calculate total price for disassembled items
      if (disassembledItems) {
        disassembledItems.forEach((item) => {
          servicesPrice += item.quantity * item.price * 2; // Assume assembling and disassembling cost the same
        });
      }

      // Calculate total price for storage items
      if (storageItems) {
        storageItems.forEach((item) => {
          servicesPrice += item.quantity * item.price * 1.1; // 10% additional cost for storage
        });
      }

      // Calculate total price for crane items
      if (craneItems) {
        craneItems.forEach((item) => {
          servicesPrice += item.quantity * item.price; // Already calculated the crane price in addCraneItems
        });
      }

      // Calculate total cost based on boxes (each box costs $15)
      boxesPrice = boxes * 5;

      

      // Calculate total price including additional costs
      totalPrice += itemsPrice + servicesPrice + distancePrice + boxesPrice;

      

      // Return the calculated result
      return {
        ...state,
        totalPrice: totalPrice,
        distancePrice: distancePrice,
        itemsPrice: itemsPrice,
        boxesPrice: boxesPrice,
        servicesPrice: servicesPrice,
        distanceInKm: distanceInKm,
        originfloorprice: originfloorprice,
        destinationfloorprice: destinationfloorprice,
        origintruckaccessprice: origintruckaccessprice,
        destinationtruckaccessprice: destinationtruckaccessprice,
        originCranePrice: originCranePrice,
        destinationCranePrice: destinationCranePrice,
        packingprice:packingprice
      };
    },
  },
});

export const {
  addItems,
  addBaseline,
  addBoxes,
  addPackagedItems,
  changeItemQuantity,
  changePackagedItemQuantity,
  removeItem,
  removePackagedItem,
  addAssembledItems,
  changeAssembledItemQuantity,
  removeAssembledItem,
  addDisassembledItems,
  changeDisassembledItemQuantity,
  removeDisassembledItem,
  addCraneItems,
  changeCraneItemQuantity,
  removeCraneItem,
  addStorageItems,
  changeStorageItemQuantity,
  removeStorageItem,
  setStorageStartDay,
  setStorageEndDay,
  calculate,
  resetState
} = mainSlice.actions;

export default mainSlice.reducer;
