const initHovers = () => {

    // find the center of the link element and set stuckX and stuckY
    // these are needed to set the position of the noisy circle
    const handleMouseEnter = e => {
      const navItem = e.currentTarget;
      const navItemBox = navItem.getBoundingClientRect();
      stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
      stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
      isStuck = true;
    };
    
    // reset isStuck on mouseLeave
    const handleMouseLeave = () => {
      isStuck = false;
    };
    
    // add event listeners to all items
    const linkItems = document.querySelectorAll(".link");
    linkItems.forEach(item => {
      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });
  };
  
  initHovers();