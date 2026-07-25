export const INITIAL_SELECTIONS = {
  "cam-v4": { "cam-v4-white": 0, "cam-v4-grey": 0, "cam-v4-black": 1 },
  "cam-pan-v3": { "cam-pan-v3-white": 0, "cam-pan-v3-black": 2 },
  "cam-floodlight-v2": { "cam-flood-v2-white": 0, "cam-flood-v2-black": 0 },
  "cam-doorbell": 0,
  "cam-battery": { "cam-battery-white": 0, "cam-battery-black": 0 },
  "plan-unlimited": 1,
  "sense-motion": 2,
  "sense-hub": 1,
  "microsd-256": 2,
};

export const CATEGORY_LABELS = {
  cameras: "CAMERAS",
  sensors: "SENSORS",
  protection: "ACCESSORIES",
  plan: "PLAN",
};

export const CATEGORY_ORDER = ["cameras", "sensors", "protection", "plan"];
