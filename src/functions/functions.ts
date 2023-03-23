import type { Post } from "~/types/types";

// 1. Extract the categories from the article data and return them as an array,
// Since we want only unique values, we will use the Set data structure
// E.g. ["qwik", "react", "vue"]
export function getUniqueCategories(posts: Post[]) {
  const categoriesSet = new Set(posts.map((post) => post.category));
  return Array.from(categoriesSet);
}

// 2. Filter the posts based on the category
// E.g. "qwik" -> [{...}, {...}]
export function filterPostsByCategory(posts: Post[], category: string) {
  return posts.filter((post) => post.category === category);
}

// 3. Filter the posts based on the search term
export function filterPostsBySearchTerm(posts: Post[], term: string) {
  const isInDescription = (post: Post) =>
    post.description?.toLowerCase().includes(term.toLowerCase().trim());
  const isInTitle = (post: Post) =>
    post.title.toLowerCase().includes(term.toLowerCase().trim());
  return posts.filter((post) => isInDescription(post) || isInTitle(post));
}
