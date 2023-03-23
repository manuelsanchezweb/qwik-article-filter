import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { animate, stagger } from "motion";
import { IconSwitcher } from "~/components/icons/IconSwitcher";
import { posts } from "~/data/posts";
import {
  filterPostsByCategory,
  filterPostsBySearchTerm,
  getUniqueCategories,
} from "~/functions/functions";
import type { Post } from "~/types/types";

export default component$(() => {
  const selectedCategory = useSignal<string | null>(null);
  const selectedTerm = useStore({ value: "" });

  let filteredPosts =
    selectedCategory.value === null
      ? posts
      : filterPostsByCategory(posts, selectedCategory.value || "all");

  filteredPosts = filterPostsBySearchTerm(filteredPosts, selectedTerm.value);

  const handleCategoryClick = $((category: string | null) => {
    selectedCategory.value = category;
  });

  const searchTerm = $((event: any) => {
    const target = event.target as HTMLInputElement;
    selectedTerm.value = target.value;
  });

  useVisibleTask$(({ track }) => {
    track(selectedCategory);
    track(selectedTerm);

    const li = document.querySelectorAll("li");
    if (!li[0]) return;

    animate(
      li,
      { opacity: [0, 1], scale: [0, 1] },
      { delay: stagger(0.1), easing: "ease-in-out" }
    );
  });

  return (
    <div class="App w-full">
      <h1 class="text-4xl">Últimos artículos del blog</h1>
      <div class="flex flex-wrap gap-4 my-8">
        <button
          onClick$={() => handleCategoryClick(null)}
          class={selectedCategory.value === null ? "bg-gray-200" : ""}
        >
          All
        </button>
        {getUniqueCategories(posts).map((category, index) => (
          <button
            class={`flex gap-2 ${
              selectedCategory.value === category ? "bg-gray-200" : ""
            }`}
            key={index}
            onClick$={() => handleCategoryClick(category)}
          >
            <IconSwitcher classIcon="w-6" icon={category} /> {category}
          </button>
        ))}
        <div class="md:ml-auto">
          Search
          <input
            class="border ml-2 border-black pl-2 h-[48px] rounded-md"
            type="text"
            name="search"
            value={selectedTerm.value}
            onKeyUp$={searchTerm}
          />
        </div>
      </div>
      <div>
        <ul class="flex flex-wrap gap-4">
          {filteredPosts[0] ? (
            filteredPosts.map((post: Post, index: number) => (
              <li
                key={post.id}
                class={`${
                  index < 4
                    ? "text-2xl min-w-[300px] lg:min-w-[600px] min-h-[350px]"
                    : "min-w-[300px] lg:min-w-[400px] lg:max-w-[450px]"
                } flex-1 border border-black rounded-md relative`}
              >
                <a href="#" class="text-black p-12 flex flex-col h-full">
                  <h2 class="font-bold mb-4">{post.title}</h2>
                  <p>{post.description}</p>
                  <IconSwitcher
                    icon={post.category}
                    classIcon="w-8 absolute bottom-2 left-2"
                  />
                </a>
              </li>
            ))
          ) : (
            <p class="text-2xl">
              No hay ningún post que se ajuste a esos parámetros.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Article Filter",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
