document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();

  // State variables
  let isOpen = false;
  let activeSubmenu = null;
  let isMobile = false;

  // DOM elements
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const desktopMenu = document.getElementById('desktop-menu');

  // Menu items data
  const menuItems = [
    {
      name: 'Home',
      link: '#',
      icon: 'home'
        },
    {
      name: 'About',
      link: '#',
      icon: 'info'
        },
    {
      name: 'Services',
      link: '#',
      icon: 'briefcase',
      submenu: [
        { name: 'Web Design', link: '#', icon: 'globe' },
        { name: 'Development', link: '#', icon: 'code' },
        { name: 'Marketing', link: '#', icon: 'bar-chart' }
            ]
        },
    {
      name: 'Portfolio',
      link: '#',
      icon: 'image'
        },
    {
      name: 'Contact',
      link: '#',
      icon: 'mail'
        }
    ];

  // Check screen size
  function checkScreenSize() {
    isMobile = window.innerWidth < 768;
    if (window.innerWidth >= 768) {
      isOpen = false;
      mobileMenu.classList.add('hidden');

      updateMenuButtonIcon();
    }
  }

  // Toggle mobile menu
  function toggleMenu() {
    isOpen = !isOpen;
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenuButton.querySelector('svg').setAttribute('data-lucide', 'X');
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.querySelector('svg').setAttribute('data-lucide', 'menu');

      activeSubmenu = null;
    }

    lucide.createIcons();
  }

  // Toggle submenu
  function toggleSubmenu(index) {
    activeSubmenu = activeSubmenu === index ? null : index;
    renderMobileMenu();
  }

  // Update mobile menu button icon
  function updateMenuButtonIcon() {
    const iconName = isOpen ? 'x' : 'menu';
    mobileMenuButton.querySelector('svg').setAttribute('data-lucide', iconName);
    lucide.createIcons();
  }

  // Render desktop menu
  function renderDesktopMenu() {
    desktopMenu.innerHTML = '';

    menuItems.forEach((item, index) => {
      const menuItemDiv = document.createElement('div');
      menuItemDiv.className = 'relative group';

      const menuLink = document.createElement('a');
      menuLink.href = item.link;
      menuLink.className = 'text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:bg-white hover:text-indigo-600 group-hover:bg-opacity-90';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'bg-white bg-opacity-20 p-1.5 rounded-full transition-all duration-300 group-hover:bg-white';

      // Create icon
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', item.icon);
      icon.className = 'w-4 h-4';

      iconSpan.appendChild(icon);
      menuLink.appendChild(iconSpan);

      // Text
      const textNode = document.createTextNode(item.name);
      menuLink.appendChild(textNode);

      if (item.submenu) {
        const chevron = document.createElement('i');
        chevron.setAttribute('data-lucide', 'chevron-down');
        chevron.className = 'ml-1 h-4 w-4 opacity-70';
        menuLink.appendChild(chevron);
      }

      // Event listeners for hovering
      if (item.submenu) {
        menuLink.addEventListener('mouseenter', () => {
          if (!isMobile) {
            activeSubmenu = activeSubmenu === index ? null : index;
            renderDesktopMenu();
          }
        });

        menuItemDiv.addEventListener('mouseleave', () => {
          if (!isMobile) {
            activeSubmenu = null;
            renderDesktopMenu();
          }
        });
      }

      menuItemDiv.appendChild(menuLink);

      if (item.submenu) {
        const submenuDiv = document.createElement('div');
        submenuDiv.className = `absolute z-10 left-0 mt-2 w-60 rounded-xl overflow-hidden backdrop-blur-lg bg-white/90 shadow-xl ring-1 ring-purple-100 transition-all duration-300 ${
                    activeSubmenu === index ? 'opacity-100 translate-y-0' : 'opacity-0 invisible -translate-y-3'
                }`;

        const submenuInnerDiv = document.createElement('div');
        submenuInnerDiv.className = 'py-2';

        item.submenu.forEach((subItem, subIndex) => {
          const subLink = document.createElement('a');
          subLink.href = subItem.link;
          subLink.className = 'flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 border-l-2 border-transparent hover:border-indigo-500';

          // Submenu icon
          const subIconSpan = document.createElement('span');
          subIconSpan.className = 'bg-indigo-100 p-1.5 rounded-full text-indigo-600';

          const subIcon = document.createElement('i');
          subIcon.setAttribute('data-lucide', subItem.icon);
          subIcon.className = 'w-4 h-4';

          subIconSpan.appendChild(subIcon);
          subLink.appendChild(subIconSpan);

          // Submenu text
          const subTextNode = document.createTextNode(subItem.name);
          subLink.appendChild(subTextNode);

          submenuInnerDiv.appendChild(subLink);
        });

        submenuDiv.appendChild(submenuInnerDiv);
        menuItemDiv.appendChild(submenuDiv);
      }

      desktopMenu.appendChild(menuItemDiv);
    });

    lucide.createIcons();
  }

  // Render mobile menu
  function renderMobileMenu() {
    const mobileMenuContainer = mobileMenu.querySelector('div');
    mobileMenuContainer.innerHTML = '';

    menuItems.forEach((item, index) => {
      const menuItemDiv = document.createElement('div');
      menuItemDiv.className = 'rounded-lg overflow-hidden mb-1';

      const menuItemInnerDiv = document.createElement('div');
      menuItemInnerDiv.className = 'flex justify-between items-center';

      // Link
      const menuLink = document.createElement('a');
      menuLink.href = item.link;
      menuLink.className = 'text-gray-800 hover:text-indigo-600 flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium';

      // Icon span
      const iconSpan = document.createElement('span');
      iconSpan.className = 'bg-indigo-100 p-1.5 rounded-full text-indigo-600 flex items-center justify-center';

      // Icon
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', item.icon);
      icon.className = 'w-4 h-4';

      iconSpan.appendChild(icon);
      menuLink.appendChild(iconSpan);

      // Text
      const textNode = document.createTextNode(item.name);
      menuLink.appendChild(textNode);

      // Click handler
      if (!item.submenu) {
        menuLink.addEventListener('click', toggleMenu);
      }

      menuItemInnerDiv.appendChild(menuLink);

      if (item.submenu) {
        const submenuButton = document.createElement('button');
        submenuButton.className = 'text-gray-500 hover:text-indigo-600 p-2 focus:outline-none';
        submenuButton.addEventListener('click', () => toggleSubmenu(index));

        const chevron = document.createElement('i');
        chevron.setAttribute('data-lucide', 'chevron-down');
        chevron.className = `h-5 w-5 transition-transform duration-300 ${
                    activeSubmenu === index ? 'transform rotate-180' : ''
                }`;

        submenuButton.appendChild(chevron);
        menuItemInnerDiv.appendChild(submenuButton);
      }

      menuItemDiv.appendChild(menuItemInnerDiv);

      if (item.submenu) {
        const submenuDiv = document.createElement('div');
        submenuDiv.className = `transition-all duration-300 ${
                    activeSubmenu === index ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'
                }`;

        const submenuInnerDiv = document.createElement('div');
        submenuInnerDiv.className = 'ml-5 pl-5 border-l-2 border-indigo-100 space-y-1';

        item.submenu.forEach((subItem, subIndex) => {
          const subLink = document.createElement('a');
          subLink.href = subItem.link;
          subLink.className = 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center gap-3 px-4 py-3 rounded-lg text-sm';
          subLink.addEventListener('click', toggleMenu);

          // Submenu icon
          const subIconSpan = document.createElement('span');
          subIconSpan.className = 'bg-indigo-100 p-1.5 rounded-full text-indigo-600 flex items-center justify-center';

          const subIcon = document.createElement('i');
          subIcon.setAttribute('data-lucide', subItem.icon);
          subIcon.className = 'w-4 h-4';

          subIconSpan.appendChild(subIcon);
          subLink.appendChild(subIconSpan);

          // Submenu text
          const subTextNode = document.createTextNode(subItem.name);
          subLink.appendChild(subTextNode);

          submenuInnerDiv.appendChild(subLink);
        });

        submenuDiv.appendChild(submenuInnerDiv);
        menuItemDiv.appendChild(submenuDiv);
      }

      mobileMenuContainer.appendChild(menuItemDiv);
    });


    lucide.createIcons();
  }

  // Initialize
  checkScreenSize();
  renderDesktopMenu();
  renderMobileMenu();

  // Event listeners
  window.addEventListener('resize', checkScreenSize);
  mobileMenuButton.addEventListener('click', toggleMenu);

  // Close submenu on outside click
  document.addEventListener('click', function(event) {
    if (isMobile) return;
    
    if (!desktopMenu.contains(event.target)) {
      activeSubmenu = null;
      renderDesktopMenu();
    }
  });
});