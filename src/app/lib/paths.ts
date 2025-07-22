export const homePath = () => '/';
export const adventurersListPath = () => '/adventurers';
export const adventurersListAPIPath = () => '/api/adventurers-list';
export const adventurerAPIPath = (adventurerId: number) => `/api/adventurers/${adventurerId}`;
export const adventurerDetailsPath = (adventurerId: number) => `/adventurers/${adventurerId}`;
export const cartPath = () => '/cart';
export const combatPath = () => '/combat';
export const imageOfAdventurer = (adventurerImage: string) => `/images/${adventurerImage}`;
export const aboutPath = () => '/about';