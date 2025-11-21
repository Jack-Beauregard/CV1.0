// Hamburger menü kezelés
var hamburger = document.getElementById('hamburger');
var sidebar = document.getElementById('sidebar');

// Helper függvények classList fallback-kel
function addClass(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    } else if (element) {
        if (element.className.indexOf(className) === -1) {
            element.className += ' ' + className;
        }
    }
}

function removeClass(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    } else if (element) {
        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)', 'g'), ' ');
    }
}

function toggleClass(element, className) {
    if (element && element.classList) {
        element.classList.toggle(className);
    } else if (element) {
        if (element.className.indexOf(className) !== -1) {
            removeClass(element, className);
        } else {
            addClass(element, className);
        }
    }
}

function hasClass(element, className) {
    if (element && element.classList) {
        return element.classList.contains(className);
    } else if (element) {
        return element.className.indexOf(className) !== -1;
    }
    return false;
}

// Hover esemény
if (hamburger) {
    if (hamburger.addEventListener) {
        hamburger.addEventListener('mouseenter', function() {
            addClass(sidebar, 'active');
            addClass(hamburger, 'hidden');
        });
    } else if (hamburger.attachEvent) {
        hamburger.attachEvent('onmouseenter', function() {
            addClass(sidebar, 'active');
            addClass(hamburger, 'hidden');
        });
    }
}

// Klikk esemény mobil eszközökön
if (hamburger) {
    if (hamburger.addEventListener) {
        hamburger.addEventListener('click', function() {
            toggleClass(sidebar, 'active');
            if (hasClass(sidebar, 'active')) {
                addClass(hamburger, 'hidden');
            } else {
                removeClass(hamburger, 'hidden');
            }
        });
    } else if (hamburger.attachEvent) {
        hamburger.attachEvent('onclick', function() {
            toggleClass(sidebar, 'active');
            if (hasClass(sidebar, 'active')) {
                addClass(hamburger, 'hidden');
            } else {
                removeClass(hamburger, 'hidden');
            }
        });
    }
}

// Ha elhagyja a menüt, zárja be
if (sidebar) {
    if (sidebar.addEventListener) {
        sidebar.addEventListener('mouseleave', function() {
            removeClass(sidebar, 'active');
            removeClass(hamburger, 'hidden');
        });
    } else if (sidebar.attachEvent) {
        sidebar.attachEvent('onmouseleave', function() {
            removeClass(sidebar, 'active');
            removeClass(hamburger, 'hidden');
        });
    }
}

// Kívülre kattintás esetén zárja be mobil eszközökön
if (document.addEventListener) {
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            var target = e.target || e.srcElement;
            if (sidebar && hamburger) {
                var sidebarContains = sidebar.contains ? sidebar.contains(target) : false;
                var hamburgerContains = hamburger.contains ? hamburger.contains(target) : false;
                if (!sidebarContains && !hamburgerContains) {
                    removeClass(sidebar, 'active');
                    removeClass(hamburger, 'hidden'); // EZ HIÁNYZIK!
                }
            }
        }
    });
} else if (document.attachEvent) {
    document.attachEvent('onclick', function(e) {
        if (window.innerWidth <= 768) {
            var target = e.target || e.srcElement;
            if (sidebar && hamburger) {
                var sidebarContains = sidebar.contains ? sidebar.contains(target) : false;
                var hamburgerContains = hamburger.contains ? hamburger.contains(target) : false;
                if (!sidebarContains && !hamburgerContains) {
                    removeClass(sidebar, 'active');
                }
            }
        }
    });
}

// Menü elem kattintás mobil eszközökön
if (window.innerWidth <= 768) {
    var menuItems = document.querySelectorAll ? document.querySelectorAll('.menu-item') : [];
    for (var i = 0; i < menuItems.length; i++) {
        (function(item) {
            if (item.addEventListener) {
                item.addEventListener('click', function() {
                    removeClass(sidebar, 'active');
                });
            } else if (item.attachEvent) {
                item.attachEvent('onclick', function() {
                    removeClass(sidebar, 'active');
                });
            }
        })(menuItems[i]);
    }
}
