
const links = document.querySelectorAll("nav button");
const pages = document.querySelectorAll(".pages");

links.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.dataset.page; 

    if (!id) {
      console.warn("Button missing data-page attribute:", link);
      return;
    }

    const target = document.getElementById(id);

    if (!target) {
      console.warn(`No element with id="${id}" found`);
      return;
    }

    pages.forEach((page) => page.classList.add("hidden"));
    target.classList.remove("hidden");
    links.forEach((l) => l.classList.remove("text-blue-400"));
    link.classList.add("text-blue-400" );
  });
});

      



  const menuBtn = document.getElementById("menuBtn");
      const mobileMenu = document.getElementById("mobileMenu");
 
      menuBtn.addEventListener("click", () => {
        const isOpen = !mobileMenu.classList.contains("hidden");
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("flex");
        menuBtn.setAttribute("aria-expanded", String(!isOpen));
        menuBtn.innerHTML = isOpen
          ? '<i class="fa-solid fa-bars"></i>'
          : '<i class="fa-solid fa-xmark"></i>';
      });




