import { create } from "zustand";
import localProductsData from "../data/products.json";
import { INITIAL_SELECTIONS } from "../data/mockData/selection";
import { fetchProducts } from "../services/api";
import toast from "react-hot-toast";

const STORAGE_KEY = "wyze-bundle-builder";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load from storage:", error);
  }
  return null;
}

function saveToStorage(state) {
  try {
    const toSave = {
      activeStep: state.activeStep,
      selections: state.selections,
      activeVariants: state.activeVariants,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error("Failed to save to storage:", error);
  }
}

function buildInitialActiveVariants(products) {
  const active = {};
  products.forEach((product) => {
    if (product.hasVariants && product.variants.length > 0) {
      active[product.id] = product.defaultVariant || product.variants[0].id;
    }
  });
  return active;
}

const saved = loadFromStorage();

export const useStore = create((set, get) => ({
  productsData: localProductsData,
  isLoading: false,
  activeStep: saved?.activeStep ?? 0,
  selections: saved?.selections ?? INITIAL_SELECTIONS,
  activeVariants: saved?.activeVariants ?? buildInitialActiveVariants(localProductsData.products),

  loadProducts: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchProducts();
      set({
        productsData: data,
        activeVariants: {
          ...buildInitialActiveVariants(data.products),
          ...saved?.activeVariants,
        },
      });
    } catch (error) {
      console.warn("API unavailable, using local data:", error.message);
      toast.error("API unavailable, using local data");
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveStep: (step) => {
    set({ activeStep: step });
    saveToStorage(get());
  },

  nextStep: () => {
    const { activeStep, productsData: pd } = get();
    if (activeStep < pd.steps.length - 1) {
      set({ activeStep: activeStep + 1 });
      saveToStorage(get());
    }
  },

  prevStep: () => {
    const { activeStep } = get();
    if (activeStep > 0) {
      set({ activeStep: activeStep - 1 });
      saveToStorage(get());
    }
  },

  setActiveVariant: (productId, variantId) => {
    set((state) => ({
      activeVariants: {
        ...state.activeVariants,
        [productId]: variantId,
      },
    }));
  },

  incrementQuantity: (productId, variantId = null) => {
    set((state) => {
      const product = state.productsData.products.find((p) => p.id === productId);
      const newSelections = { ...state.selections };

      if (product?.hasVariants && variantId) {
        newSelections[productId] = {
          ...newSelections[productId],
          [variantId]: (newSelections[productId]?.[variantId] || 0) + 1,
        };
      } else {
        newSelections[productId] = (newSelections[productId] || 0) + 1;
      }

      return { selections: newSelections };
    });
    saveToStorage(get());
  },

  decrementQuantity: (productId, variantId = null) => {
    set((state) => {
      const product = state.productsData.products.find((p) => p.id === productId);
      const newSelections = { ...state.selections };

      if (product?.hasVariants && variantId) {
        const current = newSelections[productId]?.[variantId] || 0;
        newSelections[productId] = {
          ...newSelections[productId],
          [variantId]: Math.max(0, current - 1),
        };
      } else {
        newSelections[productId] = Math.max(
          0,
          (newSelections[productId] || 0) - 1,
        );
      }

      return { selections: newSelections };
    });
    saveToStorage(get());
  },

  getStepProductCount: (stepId) => {
    const state = get();
    const stepProducts = state.productsData.products.filter((p) => p.step === stepId);
    let count = 0;
    stepProducts.forEach((product) => {
      if (product.hasVariants && product.variants.length > 0) {
        const total = Object.values(state.selections[product.id] || {}).reduce(
          (sum, qty) => sum + qty,
          0,
        );
        if (total > 0) count++;
      } else {
        if ((state.selections[product.id] || 0) > 0) count++;
      }
    });
    return count;
  },

  getProductQuantity: (productId) => {
    const state = get();
    const product = state.productsData.products.find((p) => p.id === productId);
    if (!product) return 0;

    if (product.hasVariants && product.variants.length > 0) {
      const variantSelections = state.selections[productId] || {};
      return Object.values(variantSelections).reduce(
        (sum, qty) => sum + qty,
        0,
      );
    }
    return state.selections[productId] || 0;
  },

  getActiveVariantQuantity: (productId) => {
    const state = get();
    const activeVariantId = state.activeVariants[productId];
    if (!activeVariantId) return 0;
    return state.selections[productId]?.[activeVariantId] || 0;
  },

  getSelectedItems: () => {
    const state = get();
    const items = [];

    state.productsData.products.forEach((product) => {
      if (product.hasVariants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          const qty = state.selections[product.id]?.[variant.id] || 0;
          if (qty > 0) {
            items.push({
              productId: product.id,
              variantId: variant.id,
              name: product.name,
              variantLabel: variant.label,
              variantColor: variant.color,
              price: product.price,
              compareAtPrice: product.compareAtPrice,
              quantity: qty,
              image: product.image,
              priceUnit: product.priceUnit || "",
              isFree: product.isFree || false,
              category: product.step,
            });
          }
        });
      } else {
        const qty = state.selections[product.id] || 0;
        if (qty > 0) {
          items.push({
            productId: product.id,
            variantId: null,
            name: product.name,
            variantLabel: null,
            variantColor: null,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            quantity: qty,
            image: product.image,
            priceUnit: product.priceUnit || "",
            isFree: product.isFree || false,
            category: product.step,
          });
        }
      }
    });

    return items;
  },

  getOneTimeItems: () => {
    return get()
      .getSelectedItems()
      .filter((item) => !item.priceUnit);
  },

  getSubtotal: () => {
    return get()
      .getOneTimeItems()
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalCompareAt: () => {
    return get()
      .getOneTimeItems()
      .reduce((sum, item) => {
        const cap = item.compareAtPrice || item.price;
        return sum + cap * item.quantity;
      }, 0);
  },

  getSavings: () => {
    const state = get();
    return state.getTotalCompareAt() - state.getSubtotal();
  },

  resetSystem: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      activeStep: 0,
      selections: INITIAL_SELECTIONS,
      activeVariants: buildInitialActiveVariants(localProductsData.products),
    });
  },
}));
