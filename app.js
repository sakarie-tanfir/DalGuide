// DalGuide Application Logic

// --- MOCK DATABASE (12 Hangout Spots) ---
const locationsData = [
    {
        id: 'faynuus',
        title: 'Faynuus',
        category: 'lounge',
        lat: 9.563,
        lng: 44.062,
        icon: 'fa-solid fa-mug-saucer',
        desc: 'A great spot in Hargeisa to chill, drink authentic Somali tea, and get to know people in a relaxed environment.',
        features: ['Chill', 'Get to know people']
    },
    {
        id: 'caweys_lounge',
        title: 'Caweys Lounge',
        category: 'lounge',
        lat: 9.558,
        lng: 44.067,
        icon: 'fa-solid fa-couch',
        desc: 'A comfortable lounge where people gather to socialize. It is the perfect atmosphere to meet friends and get to know each other.',
        features: ['Gather', 'Get to know each other']
    },
    {
        id: 'lotus_garden',
        title: 'Lotus Garden',
        category: 'cafe',
        lat: 9.551,
        lng: 44.070,
        icon: 'fa-solid fa-leaf',
        desc: 'A peaceful, relaxing garden setting ideal for dining out with friends and family or just hanging out in the evening.',
        features: ['Relaxing', 'Dining', 'Hangout']
    },
    {
        id: 'isha_gobka',
        title: 'Isha Gobka',
        category: 'lounge',
        lat: 9.548,
        lng: 44.061,
        icon: 'fa-solid fa-tree-city',
        desc: 'A cool, breezy hangout spot offering wonderful views and a great place to chill with your group.',
        features: ['Chill', 'Views', 'Hangout']
    },
    {
        id: 'beerta_raaxada',
        title: 'Beerta Raaxada',
        category: 'cafe',
        lat: 9.555,
        lng: 44.050,
        icon: 'fa-solid fa-tree',
        desc: 'A beautiful natural setting perfect for escaping the city bustle. Enjoy nature, great views, and pure relaxation.',
        features: ['Nature', 'Relaxing', 'Views']
    },
    {
        id: 'hiil_cafe',
        title: 'Hiil Cafe',
        category: 'cafe',
        lat: 9.565,
        lng: 44.069,
        icon: 'fa-solid fa-coffee',
        desc: 'A cozy cafe dedicated to excellent coffee and relaxation. The perfect spot for a quiet afternoon or a calm meetup.',
        features: ['Coffee', 'Relaxation']
    },
    {
        id: 'social_cafe',
        title: 'Social Cafe',
        category: 'cafe',
        lat: 9.561,
        lng: 44.072,
        icon: 'fa-solid fa-camera',
        desc: 'A modern, vibrant cafe that is perfect for hanging out, taking aesthetic pictures, and enjoying good company.',
        features: ['Hangout', 'Pictures']
    },
    {
        id: 'masalle_view',
        title: 'Masalle View',
        category: 'lounge',
        lat: 9.575,
        lng: 44.080,
        icon: 'fa-solid fa-binoculars',
        desc: 'Elevated location offering some of the most scenic panoramic views of Hargeisa. A great spot to chill and take in the sights.',
        features: ['Scenic Views', 'Chill']
    },
    {
        id: 'laaleys_view',
        title: 'Laaleys View',
        category: 'lounge',
        lat: 9.570,
        lng: 44.055,
        icon: 'fa-solid fa-sun',
        desc: 'Famous for its incredible sunset views over the city. It is a fantastic hangout spot for the late afternoon and evening.',
        features: ['Sunset Views', 'Hangout']
    },
    {
        id: 'masalla_play_zone',
        title: 'Masalla Play Zone',
        category: 'activity',
        lat: 9.545,
        lng: 44.075,
        icon: 'fa-solid fa-bowling-ball',
        desc: 'The ultimate entertainment destination in Hargeisa. Features a bowling alley, arcade games, and plenty of space to hang out.',
        features: ['Bowling', 'Arcade', 'Hangout']
    },
    {
        id: 'city_rollerz',
        title: 'City Rollerz',
        category: 'activity',
        lat: 9.568,
        lng: 44.060,
        icon: 'fa-solid fa-shoe-prints',
        desc: 'A fun and energetic indoor roller skating rink. Great for groups looking for an active and entertaining night out.',
        features: ['Skating', 'Fun']
    },
    {
        id: 'damal_hotel',
        title: 'Damal Hotel',
        category: 'lounge',
        lat: 9.5620952,
        lng: 44.0647952,
        icon: 'fa-solid fa-hotel',
        desc: 'A premium downtown lounge perfect for networking, enjoying great coffee, and overlooking the vibrant city center.',
        features: ['Networking', 'Coffee', 'City View']
    },
    {
        id: 'elite_gaming',
        title: 'Elite Gaming',
        category: 'activity',
        lat: 9.566,
        lng: 44.065,
        icon: 'fa-solid fa-gamepad',
        desc: 'The top spot for gamers in the city. Play the latest console video games and challenge your friends on the pool table.',
        features: ['Video Games', 'Pool Table']
    },
    {
        id: 'waafi_mall',
        title: 'Waafi Mall',
        category: 'market',
        lat: 9.558,
        lng: 44.068,
        icon: 'fa-solid fa-bag-shopping',
        desc: 'A modern shopping destination offering a variety of clothing, electronics, and lifestyle stores.',
        features: ['Shopping', 'Hangout']
    },
    {
        id: 'ciir_mall',
        title: 'Ciir Mall',
        category: 'market',
        lat: 9.562,
        lng: 44.064,
        icon: 'fa-solid fa-bag-shopping',
        desc: 'A bustling commercial center in Hargeisa with numerous shops providing local and imported goods.',
        features: ['Shopping', 'Browsing']
    }
];

// --- APP STATE ---
let map;
let markers = {};
let currentCategory = 'all';
let currentSearch = '';

function safeGetStorage(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.warn('Storage error for ' + key, e);
        return defaultValue;
    }
}
function safeSetStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('Could not save to localStorage', e);
    }
}

let favorites = safeGetStorage('dalguide_favorites', []);
let itinerary = safeGetStorage('dalguide_itinerary', {});
let activeModalSpotId = null;
let userLocationMarker = null;
let userLocationWatcher = null;

// DOM Elements
const attractionsList = document.getElementById('attractionsList');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const categoryBtns = document.querySelectorAll('.category-btn');
const themeToggle = document.getElementById('themeToggle');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

const favoritesList = document.getElementById('favoritesList');
const favoritesBadge = document.getElementById('favoritesBadge');

const itineraryList = document.getElementById('itineraryList');
const itineraryDaySelect = document.getElementById('itineraryDay');
const emptyItineraryMsg = document.getElementById('emptyItineraryMsg');

const detailModal = document.getElementById('detailModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const sidebar = document.querySelector('.sidebar');

const currencyBtn = document.getElementById('currencyBtn');
const currencyModal = document.getElementById('currencyModal');
const currencyCloseBtn = document.getElementById('currencyCloseBtn');
const exchangeUsdInput = document.getElementById('exchangeUsdInput');
const exchangeSlshOutput = document.getElementById('exchangeSlshOutput');
const btnExchangeNow = document.getElementById('btnExchangeNow');

const paymentBtn = document.getElementById('paymentBtn');
const paymentModal = document.getElementById('paymentModal');
const paymentCloseBtn = document.getElementById('paymentCloseBtn');

// --- INITIALIZATION ---
function initApp() {
    initTheme();
    initMap();
    renderAttractions();
    renderFavorites();
    renderItinerary();
    setupEventListeners();
    updateFavoritesBadge();
}

// --- THEME ---
function initTheme() {
    const savedTheme = safeGetStorage('dalguide_theme', 'light');
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    safeSetStorage('dalguide_theme', newTheme);
    updateThemeIcon();
    
    setTimeout(() => { if(map) map.invalidateSize(); }, 300);
});

// --- MAP ---
function initMap() {
    // Center map on Hargeisa
    map = L.map('map', {
        zoomControl: false
    }).setView([9.560, 44.065], 14);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // 1. Custom Locate Me button using native Geolocation API for maximum accuracy
    const LocateMeControl = L.Control.extend({
        options: { position: 'topright' },
        onAdd: function() {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            const btn = L.DomUtil.create('a', '', container);
            btn.href = '#';
            btn.title = 'Locate Me';
            btn.style.cssText = 'background:var(--bg-modal);color:var(--primary);position:relative;display:flex;align-items:center;justify-content:center;width:30px;height:30px;';
            btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2" fill="none"/></svg>`;
            L.DomEvent.on(btn, 'click', function(e) {
                L.DomEvent.preventDefault(e);
                locateMe(btn);
            });
            return container;
        }
    });
    new LocateMeControl().addTo(map);

    // 2. Google Maps feature: Global Search (Geocoder)
    const geocoderControl = L.Control.geocoder({
        defaultMarkGeocode: false,
        position: 'topleft'
    });
    
    geocoderControl.on('markgeocode', function(e) {
        if (tempMarker) map.removeLayer(tempMarker);
        const latlng = e.geocode.center;
        tempMarker = L.marker(latlng).addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();
        map.setView(latlng, 16);
    }).addTo(map);

    // locationfound is no longer used since we use the native API

    // 3. Google Maps feature: Click to drop a temporary pin
    map.on('click', function(e) {
        if (tempMarker) map.removeLayer(tempMarker);
        tempMarker = L.marker(e.latlng).addTo(map)
            .bindPopup("Dropped Pin<br>" + e.latlng.lat.toFixed(4) + ", " + e.latlng.lng.toFixed(4))
            .openPopup();
    });

    // Google Maps Tile Layers (optimized for performance using a single subdomain to avoid DNS lookup overhead and idle updating)
    const googleRoadmap = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: '&copy; Google Maps',
        updateWhenIdle: true
    });

    const googleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: '&copy; Google Maps',
        updateWhenIdle: true
    });

    const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: '&copy; Google Maps',
        updateWhenIdle: true
    });

    const googleTerrain = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: '&copy; Google Maps',
        updateWhenIdle: true
    });

    // Add Roadmap as default
    googleRoadmap.addTo(map);

    // Layer selection control
    const baseMaps = {
        "Roadmap": googleRoadmap,
        "Satellite": googleSatellite,
        "Hybrid": googleHybrid,
        "Terrain": googleTerrain
    };
    L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

    locationsData.forEach(spot => {
        const iconHtml = `<div class="marker-pin"></div><i class="${spot.icon}"></i>`;
        const customIcon = L.divIcon({
            className: `custom-marker ${spot.category}`,
            html: iconHtml,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        const marker = L.marker([spot.lat, spot.lng], { icon: customIcon }).addTo(map);
        
        marker.bindPopup(`
            <div class="popup-content">
                <h3>${spot.title}</h3>
                <p style="margin-top:4px; font-size:11px; text-transform:uppercase; color:var(--primary); font-weight:bold;">${spot.category}</p>
            </div>
        `);

        marker.on('click', () => {
            openModal(spot.id);
        });

        markers[spot.id] = marker;
    });

    // Force-green all Leaflet control buttons via direct inline styles
    greenifyControls();
}

function greenifyControls() {
    // Zoom buttons (+/-) — these are text characters, just recolor them
    document.querySelectorAll('.leaflet-control-zoom-in, .leaflet-control-zoom-out').forEach(btn => {
        btn.style.color = 'var(--primary)';
        btn.style.backgroundColor = 'var(--bg-modal)';
        btn.style.fontWeight = 'bold';
        btn.style.fontSize = '18px';
    });

    // (Locate button styling is inline in the custom LocateMeControl)

    // Layers control toggle — replace black background-image with a green layers SVG
    document.querySelectorAll('.leaflet-control-layers-toggle').forEach(btn => {
        btn.style.backgroundColor = 'var(--bg-modal)';
        btn.style.color = 'var(--primary)';
        btn.style.backgroundImage = 'none';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.85"/><path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;
        btn.style.position = 'relative';
    });

    // Geocoder search icon — replace black background-image with a green magnifying glass SVG
    document.querySelectorAll('.leaflet-control-geocoder-icon').forEach(btn => {
        btn.style.backgroundColor = 'var(--bg-modal)';
        btn.style.color = 'var(--primary)';
        btn.style.backgroundImage = 'none';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"><circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/><line x1="14.5" y1="14.5" x2="20" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`;
        btn.style.position = 'relative';
    });
}

// --- FILTERING & RENDERING ---
function getFilteredLocations() {
    return locationsData.filter(spot => {
        const matchCategory = currentCategory === 'all' || spot.category === currentCategory;
        const matchSearch = spot.title.toLowerCase().includes(currentSearch) || 
                            spot.desc.toLowerCase().includes(currentSearch) ||
                            spot.features.join(' ').toLowerCase().includes(currentSearch);
        return matchCategory && matchSearch;
    });
}

function renderAttractions() {
    const filtered = getFilteredLocations();
    
    if (filtered.length === 0) {
        attractionsList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-magnifying-glass-location"></i>
                <p>No locations found matching your search.</p>
            </div>
        `;
    } else {
        attractionsList.innerHTML = filtered.map(spot => createCardHTML(spot)).join('');
    }

    locationsData.forEach(spot => {
        if (markers[spot.id]) {
            if (filtered.includes(spot)) {
                if (!map.hasLayer(markers[spot.id])) map.addLayer(markers[spot.id]);
            } else {
                if (map.hasLayer(markers[spot.id])) map.removeLayer(markers[spot.id]);
            }
        }
    });
}

function createCardHTML(spot) {
    const isFav = favorites.includes(spot.id);
    return `
        <div class="card" onclick="openModal('${spot.id}')">
            <div class="card-icon">
                <i class="${spot.icon}"></i>
            </div>
            <div class="card-content">
                <h3 class="card-title">${spot.title}</h3>
                <p class="card-desc">${spot.features.slice(0,2).join(' • ')}</p>
            </div>
            <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav(event, '${spot.id}')">
                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
        </div>
    `;
}

// --- FAVORITES ---
window.toggleFav = function(event, spotId) {
    if(event) event.stopPropagation();
    
    const index = favorites.indexOf(spotId);
    if (index === -1) favorites.push(spotId);
    else favorites.splice(index, 1);
    
    safeSetStorage('dalguide_favorites', favorites);
    updateFavoritesBadge();
    renderAttractions();
    renderFavorites();
    
    if (activeModalSpotId === spotId) {
        updateModalFavButton(spotId);
    }
}

function updateFavoritesBadge() {
    favoritesBadge.textContent = favorites.length;
}

function renderFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-heart"></i>
                <p>No favorite spots yet. Click the heart icon on any place to save it.</p>
            </div>
        `;
        return;
    }
    const favSpots = favorites.map(id => locationsData.find(s => s.id === id)).filter(Boolean);
    favoritesList.innerHTML = favSpots.map(spot => createCardHTML(spot)).join('');
}

// --- ITINERARY ---
window.addToItinerary = function(spotId) {
    const day = itineraryDaySelect.value;
    if (!itinerary[day]) itinerary[day] = [];
    
    if (!itinerary[day].includes(spotId)) {
        itinerary[day].push(spotId);
        safeSetStorage('dalguide_itinerary', itinerary);
        renderItinerary();
    }
    
    document.querySelector('.tab-btn[data-tab="itinerary"]').click();
}

window.removeFromItinerary = function(spotId) {
    const day = itineraryDaySelect.value;
    if (itinerary[day]) {
        itinerary[day] = itinerary[day].filter(id => id !== spotId);
        safeSetStorage('dalguide_itinerary', itinerary);
        renderItinerary();
    }
}

itineraryDaySelect.addEventListener('change', renderItinerary);

function renderItinerary() {
    const day = itineraryDaySelect.value;
    const spots = itinerary[day] || [];
    
    if (spots.length === 0) {
        itineraryList.innerHTML = '';
        emptyItineraryMsg.style.display = 'block';
        return;
    }
    
    emptyItineraryMsg.style.display = 'none';
    const dayLocations = spots.map(id => locationsData.find(s => s.id === id)).filter(Boolean);
    
    itineraryList.innerHTML = dayLocations.map((spot, index) => `
        <div class="itinerary-item" onclick="centerMap(${spot.lat}, ${spot.lng})">
            <div style="font-weight:bold; color:var(--primary); width:20px;">${index + 1}.</div>
            <div class="itinerary-item-info">
                <h4>${spot.title}</h4>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(spot.title + ', Hargeisa')}" target="_blank" onclick="event.stopPropagation();" title="Navigate" style="color: #4285F4; text-decoration: none; padding: 4px;">
                    <i class="fa-solid fa-location-arrow"></i>
                </a>
                <button class="remove-itinerary-btn" onclick="event.stopPropagation(); removeFromItinerary('${spot.id}')">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    `).join('');

    const latlngs = dayLocations.map(s => L.latLng(s.lat, s.lng));
    if (latlngs.length > 0) {
        map.setView(latlngs[0], 15);
    }
}

// Removed Steps Panel Logic

// --- LOCATE ME (Native Geolocation API) ---
function locateMe(btnEl) {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    // Show loading state on button
    const origHTML = btnEl.innerHTML;
    btnEl.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2.5" fill="none" stroke-dasharray="25" stroke-dashoffset="10"><animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="0.9s" repeatCount="indefinite"/></circle></svg>`;
    btnEl.style.cursor = 'wait';

    // Stop any previous watch
    if (userLocationWatcher !== null) {
        navigator.geolocation.clearWatch(userLocationWatcher);
        userLocationWatcher = null;
    }
    if (userLocationMarker) {
        map.removeLayer(userLocationMarker);
        userLocationMarker = null;
    }

    let settled = false;

    // First: quick coarse fix
    navigator.geolocation.getCurrentPosition(
        function(pos) {
            if (!settled) placeUserPin(pos, btnEl, origHTML);
        },
        function() {},
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );

    // Then watch for a more accurate fix
    userLocationWatcher = navigator.geolocation.watchPosition(
        function(pos) {
            settled = true;
            btnEl.innerHTML = origHTML;
            btnEl.style.cursor = 'pointer';
            placeUserPin(pos, btnEl, origHTML);
        },
        function(err) {
            btnEl.innerHTML = origHTML;
            btnEl.style.cursor = 'pointer';
            let msg = 'Could not find your location.';
            if (err.code === 1) msg = 'Location access denied. Please allow location in your browser settings.';
            else if (err.code === 3) msg = 'Location timed out. Make sure GPS is enabled.';
            alert(msg);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );

    // Auto-stop watching after 15s (we have a good fix by then)
    setTimeout(() => {
        if (userLocationWatcher !== null) {
            navigator.geolocation.clearWatch(userLocationWatcher);
            userLocationWatcher = null;
        }
    }, 15000);
}

function placeUserPin(pos, btnEl, origHTML) {
    const latlng = L.latLng(pos.coords.latitude, pos.coords.longitude);
    const accuracy = pos.coords.accuracy;

    if (userLocationMarker) map.removeLayer(userLocationMarker);

    // Provide user feedback if accuracy is poor (>1km)
    let accuracyWarning = '';
    if (accuracy > 1000) {
        accuracyWarning = `<br><strong style="color:red; font-size:12px;">⚠️ GPS signal weak.<br>Location is approximate.</strong>`;
    }

    // Custom pulsing blue dot for user location
    const userIcon = L.divIcon({
        className: '',
        html: `<div class="user-location-dot"><div class="user-location-pulse"></div></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    userLocationMarker = L.marker(latlng, { icon: userIcon, zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(`<b>📍 You are here</b><br><small>Accuracy: ±${Math.round(accuracy)}m</small>${accuracyWarning}`)
        .openPopup();

    // Add accuracy circle
    if (accuracy < 5000) {
        L.circle(latlng, { radius: accuracy, color: '#1a73e8', fillColor: '#1a73e8', fillOpacity: 0.08, weight: 1 }).addTo(map);
    }

    map.flyTo(latlng, 16, { animate: true, duration: 1.5 });
}

// --- MODALS ---
window.openModal = function(spotId) {
    const spot = locationsData.find(s => s.id === spotId);
    if(!spot) return;
    
    activeModalSpotId = spotId;

    document.getElementById('modalIcon').innerHTML = `<i class="${spot.icon}"></i>`;
    document.getElementById('modalCategory').textContent = spot.category;
    document.getElementById('modalTitle').textContent = spot.title;
    document.getElementById('modalDesc').textContent = spot.desc;
    document.getElementById('modalFeatures').innerHTML = spot.features.map(f => `<li><i class="fa-solid fa-check" style="color:var(--secondary)"></i> ${f}</li>`).join('');
    
    updateModalFavButton(spotId);
    
    // Wire up Navigate button to Google Maps
    const navigateBtn = document.getElementById('modalNavigateBtn');
    if (navigateBtn) {
        navigateBtn.onclick = () => {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(spot.title + ', Hargeisa')}`, '_blank');
        };
    }

    detailModal.classList.add('show');
    centerMap(spot.lat, spot.lng, false);
}

function updateModalFavButton(spotId) {
    const isFav = favorites.includes(spotId);
    const btn = document.getElementById('modalFavBtn');
    if (btn) {
        btn.className = `btn-fav ${isFav ? 'active' : ''}`;
        btn.innerHTML = `<i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>`;
        btn.onclick = () => toggleFav(null, spotId);
    }
}

const itinBtn = document.getElementById('modalItineraryBtn');
if (itinBtn) {
    itinBtn.onclick = () => {
        if(activeModalSpotId) {
            addToItinerary(activeModalSpotId);
            closeModal();
        }
    };
}

function closeModal() {
    detailModal.classList.remove('show');
    activeModalSpotId = null;
}

modalCloseBtn.addEventListener('click', closeModal);
detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeModal();
});

// Currency Modal Logic (Shabel Exchange)
currencyBtn.addEventListener('click', () => {
    currencyModal.classList.add('show');
    // reset calculator
    if(exchangeUsdInput) exchangeUsdInput.value = '';
    if(exchangeSlshOutput) exchangeSlshOutput.value = '0';
    if(btnExchangeNow) {
        btnExchangeNow.style.opacity = '0.5';
        btnExchangeNow.style.pointerEvents = 'none';
        btnExchangeNow.href = '#';
    }
});

const closeCurrencyModal = () => { currencyModal.classList.remove('show'); };
currencyCloseBtn.addEventListener('click', closeCurrencyModal);

currencyModal.addEventListener('click', (e) => {
    if (e.target === currencyModal) closeCurrencyModal();
});

// Shabel Exchange Calculator Logic
if (exchangeUsdInput && exchangeSlshOutput && btnExchangeNow) {
    exchangeUsdInput.addEventListener('input', (e) => {
        const usdAmount = parseFloat(e.target.value);
        if (!isNaN(usdAmount) && usdAmount > 0) {
            const slshAmount = usdAmount * 10000;
            // Format with commas
            exchangeSlshOutput.value = slshAmount.toLocaleString('en-US');
            
            // Enable button and set USSD code: *377*313222*Amount#
            btnExchangeNow.style.opacity = '1';
            btnExchangeNow.style.pointerEvents = 'auto';
            
            // We use %23 to URL-encode the '#' sign so the phone dialer understands it
            btnExchangeNow.href = `tel:*377*313222*${usdAmount}%23`;
        } else {
            exchangeSlshOutput.value = '0';
            btnExchangeNow.style.opacity = '0.5';
            btnExchangeNow.style.pointerEvents = 'none';
            btnExchangeNow.href = '#';
        }
    });
}

// Payment Modal Logic
paymentBtn.addEventListener('click', () => {
    paymentModal.classList.add('show');
    updatePaymentDialLink();
});

const closePaymentModal = () => { paymentModal.classList.remove('show'); };
paymentCloseBtn.addEventListener('click', closePaymentModal);
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModal();
});

// Payment Tabs Logic
const tabLocalPay = document.getElementById('tabLocalPay');
const tabIntlPay = document.getElementById('tabIntlPay');
const localPayContent = document.getElementById('localPayContent');
const intlPayContent = document.getElementById('intlPayContent');

tabLocalPay.addEventListener('click', () => {
    tabLocalPay.style.borderBottomColor = 'var(--primary)';
    tabLocalPay.style.color = 'var(--primary)';
    tabIntlPay.style.borderBottomColor = 'transparent';
    tabIntlPay.style.color = 'var(--text-muted)';
    localPayContent.style.display = 'block';
    intlPayContent.style.display = 'none';
});

tabIntlPay.addEventListener('click', () => {
    tabIntlPay.style.borderBottomColor = 'var(--primary)';
    tabIntlPay.style.color = 'var(--primary)';
    tabLocalPay.style.borderBottomColor = 'transparent';
    tabLocalPay.style.color = 'var(--text-muted)';
    intlPayContent.style.display = 'block';
    localPayContent.style.display = 'none';
});

function updatePaymentDialLink() {
    const currency = document.getElementById('payCurrency').value;
    const type = document.getElementById('payType').value;
    const num = document.getElementById('payNumber').value || 'NUMBER';
    const amt = document.getElementById('payAmount').value || 'AMOUNT';
    
    let prefix = '';
    if (currency === 'usd') {
        prefix = (type === 'regular') ? '*880*' : '*883*';
    } else if (currency === 'slsh') {
        prefix = (type === 'regular') ? '*220*' : '*223*';
    }
    
    const code = `${prefix}${num}*${amt}#`;
    const telLink = `tel:${code.replace('#', '%23')}`;
    
    const dialBtn = document.getElementById('payDialBtn');
    dialBtn.href = telLink;
    dialBtn.innerHTML = `<i class="fa-solid fa-phone"></i> Dial ${code}`;
}

['payCurrency', 'payType', 'payNumber', 'payAmount'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePaymentDialLink);
    document.getElementById(id).addEventListener('change', updatePaymentDialLink);
});

// Checkout Form Logic
const btnCreditCard = document.getElementById('btnCreditCard');
const checkoutFormContent = document.getElementById('checkoutFormContent');
const btnBackToMethods = document.getElementById('btnBackToMethods');
const simulatedCheckoutForm = document.getElementById('simulatedCheckoutForm');
const paymentSuccessMsg = document.getElementById('paymentSuccessMsg');
const btnSubmitPayment = document.getElementById('btnSubmitPayment');
const tabsContainer = tabLocalPay.parentElement; // The div holding the Local/Intl tabs

btnCreditCard.addEventListener('click', () => {
    intlPayContent.style.display = 'none';
    tabsContainer.style.display = 'none';
    checkoutFormContent.style.display = 'block';
    simulatedCheckoutForm.style.display = 'block';
    paymentSuccessMsg.style.display = 'none';
});

btnBackToMethods.addEventListener('click', () => {
    checkoutFormContent.style.display = 'none';
    tabsContainer.style.display = 'flex';
    intlPayContent.style.display = 'block';
});

simulatedCheckoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalBtnHTML = btnSubmitPayment.innerHTML;
    btnSubmitPayment.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    btnSubmitPayment.disabled = true;

    setTimeout(() => {
        simulatedCheckoutForm.style.display = 'none';
        paymentSuccessMsg.style.display = 'block';
        
        setTimeout(() => {
            closePaymentModal();
            // Reset state
            btnSubmitPayment.innerHTML = originalBtnHTML;
            btnSubmitPayment.disabled = false;
            simulatedCheckoutForm.reset();
            checkoutFormContent.style.display = 'none';
            tabsContainer.style.display = 'flex';
            intlPayContent.style.display = 'block';
        }, 2500);
    }, 1500);
});

// --- UTILS & LISTENERS ---
window.centerMap = function(lat, lng, zoomIn = true) {
    map.setView([lat, lng], zoomIn ? 16 : map.getZoom(), { animate: true });
}

function setupEventListeners() {
    // Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab') + 'Tab';
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Categories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderAttractions();
        });
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        clearSearchBtn.style.display = currentSearch.length > 0 ? 'block' : 'none';
        renderAttractions();
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        clearSearchBtn.style.display = 'none';
        renderAttractions();
    });

    // FAQ Toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const parent = q.parentElement;
            parent.classList.toggle('open');
            const icon = q.querySelector('i');
            if (parent.classList.contains('open')) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

    // Responsive Sidebar Toggle
    mobileSidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('closed');
        }
        
        // Trigger map invalidateSize repeatedly during transition to prevent gray areas
        let count = 0;
        const interval = setInterval(() => {
            if (map) map.invalidateSize();
            count++;
            if (count >= 10) clearInterval(interval);
        }, 50); // runs every 50ms for 500ms
    });

    // Steps Panel Close
    const stepsPanelCloseBtn = document.getElementById('stepsPanelClose');
    if (stepsPanelCloseBtn) {
        stepsPanelCloseBtn.addEventListener('click', () => {
            hideStepsPanel();
        });
    }
}

// Run app
document.addEventListener('DOMContentLoaded', initApp);
