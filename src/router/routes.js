export const ALL = "/";
export const CREATE = "/create";
export const EDIT = "/edit/:id";
export const SETTINGS = "/settings";
export const FAVORITES = "/favorites";
export const GROUPS = "/groups";
export const TRASH = "/trash";
export const DETAILS = "/details/:id";

export const PRIMARY_LINKS = [
  {
    path: ALL,
    name: "Home",
    icon: "bi bi-house-door",
    iconFilled: "bi bi-house-door-fill",
  },
  {
    path: CREATE,
    name: "New Notes",
    icon: "bi bi-plus-circle",
    iconFilled: "bi bi-plus-circle-fill",
  },
  {
    path: FAVORITES,
    name: "Favorites",
    icon: "bi bi-star",
    iconFilled: "bi bi-star-fill",
  },
];

export const SECONDARY_LINKS = [
  {
    path: GROUPS,
    name: "Notes Group",
    icon: "bi bi-collection",
    iconFilled: "bi bi-collection-fill",
  },
];

export const OTHER_LINKS = [
  {
    path: EDIT,
    name: "Edit Notes"
  }
]
