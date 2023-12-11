export const ALL = "/";
export const CREATE = "/create";
export const SETTINGS = "/settings";
export const FAVORITES = "/favorites";
export const TRASH = "/trash";

export const PRIMARY_LINKS = [
  {
    path: ALL,
    name: "All",
    icon: "bi bi-house-door",
    iconFilled: "bi bi-house-door-fill",
  },
  {
    path: CREATE,
    name: "New Note",
    icon: "bi bi-plus-circle",
    iconFilled: "bi bi-plus-circle-fill",
  },
  {
    path: SETTINGS,
    name: "Settings",
    icon: "bi bi-gear",
    iconFilled: "bi bi-gear-fill",
  },
];

export const SECONDARY_LINKS = [
    {
        path: FAVORITES,
        name: 'Favorites',
        icon: 'bi bi-star',
        iconFilled: 'bi bi-star-fill'
    },
    {
        path: TRASH,
        name: 'Trash Bin',
        icon: 'bi bi-trash3',
        iconFilled: 'bi bi-trash3-fill'
    },
]