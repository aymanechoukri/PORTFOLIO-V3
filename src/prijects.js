import { projects } from "./data.js";

export function renderProjects(showProjects = projects) {
    const fregma = document.createDocumentFragment()

    if (showProjects.length === 0) {
        const emptyMessage = document.createElement("div");

        emptyMessage.className = "col-span-full flex flex-col items-center justify-center py-16 text-center";

        emptyMessage.innerHTML = `
            <i class="fa-solid fa-folder-open mb-4 text-4xl text-rose-500/60"></i>

            <h3 class="text-xl font-bold text-white">
                No Projects Found
            </h3>

            <p class="mt-2 text-sm text-gray-400">
                Try changing your search or category filter.
            </p>
        `;

        fregma.append(emptyMessage);
        return fregma;
    }
    showProjects.forEach((project, index) => {
        const article = document.createElement("article");
        article.setAttribute("data-aos", "fade-left");
        article.setAttribute("data-aos-delay", index * 400);
        article.innerHTML = "";
        article.classList.add("group", "w-full", "max-w-[500px]", "overflow-hidden", "rounded-2xl" ,"border", "border-rose-900/40", "bg-gradient-to-br", "from-[#160609]", "via-[#100406]", "to-black", "shadow-xl", "shadow-rose-950/20", "transition-all", "duration-500", "hover:-translate-y-2", "hover:border-rose-600/60", "hover:shadow-2xl", "hover:shadow-rose-900/30");
        article.innerHTML += ` <div class="relative h-[250px] overflow-hidden">
                <img
                    src=${project.image}
                    alt=${project.alt}
                    loading="lazy"
                    class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                >

                <div class="absolute inset-0 bg-gradient-to-t from-[#100406] via-transparent to-transparent"></div>

                <span class="absolute left-4 top-4 rounded-full border border-rose-500/30 bg-black/70 px-3 py-1 text-xs font-semibold text-rose-400 backdrop-blur-md">
                    ${project.category}
                </span>
            </div>

            <div class="flex flex-col gap-5 p-6">

                <div class="flex items-center justify-between gap-3">
                    <h3 class="text-xl font-bold text-white transition-colors duration-300 group-hover:text-rose-400">
                        ${project.title}
                    </h3>

                    <i class="fa-solid fa-arrow-up-right-from-square text-rose-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"></i>
                </div>

                <p class="text-sm leading-7 text-gray-400">
                    ${project.description}
                </p>

                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(technologie => `
                            <span class="rounded-md border border-rose-900/50 bg-rose-950/30 px-3 py-1.5 text-xs text-rose-300">${technologie}</span>
                        `).join("")}
                </div>

                <div class="h-px w-full bg-gradient-to-r from-rose-700/60 via-rose-900/30 to-transparent"></div>

                <div class="flex items-center justify-between">
                    <span class="text-xs font-medium tracking-wider text-gray-500">
                        ${project.label}
                    </span>

                    <a href=${project.link} class="inline-flex items-center gap-2 text-sm font-semibold text-rose-400 transition-all hover:gap-3 hover:text-rose-300">
                        View Project
                        <i class="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                </div>

            </div>`;

            fregma.append(article);
    })
    return fregma;
}


export function searchAndFliter(search, filters, group) {
    const reusltSearchAndFilter = projects.filter(project => {
        const searchs = project.title.toLowerCase().includes(search.toLowerCase());
        const filt = filters === "All" || project.category === filters;
        return searchs && filt
    });

    group.replaceChildren(renderProjects(reusltSearchAndFilter))
}