import { useMemo, useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'Studio wireless headphones', category: 'Electronics', price: 89, original: 129, rating: 4.8, reviews: 2341, image: 'photo-1505740420928-5e560c06d30e', color: '#eee8de', badge: 'BESTSELLER', description: 'Rich, detailed sound meets all-day comfort. Enjoy your favorite music with adaptive noise cancellation and up to 40 hours of battery life.' },
  { id: 2, name: 'Everyday leather sneakers', category: 'Fashion', price: 64, original: 92, rating: 4.6, reviews: 892, image: 'photo-1542291026-7eec264c27ff', color: '#f3e9e8', badge: '−30%', description: 'Your new everyday favorite. A lightweight, cushioned sole and premium materials make every step feel a little better.' },
  { id: 3, name: 'Cloud-knit lounge chair', category: 'Home', price: 249, original: 329, rating: 4.9, reviews: 416, image: 'photo-1503602642458-232111445657', color: '#edece5', badge: '−24%', description: 'A sculptural silhouette, soft textured upholstery, and a solid wood frame. Designed to make your favorite corner even cozier.' },
  { id: 4, name: 'Daily glow skincare set', category: 'Beauty', price: 38, original: 52, rating: 4.7, reviews: 1204, image: 'photo-1608248543803-ba4f8c70ae0b', color: '#f5eae3', badge: 'POPULAR', description: 'A simple three-step ritual for hydrated, happy skin. Made with gentle, nourishing ingredients for your daily glow.' },
  { id: 5, name: 'Modern ceramic table lamp', category: 'Home', price: 56, original: 79, rating: 4.5, reviews: 327, image: 'photo-1507473885765-e6ed057f782c', color: '#eee9e0', badge: '−29%', description: 'Set the mood with warm, ambient light. This timeless ceramic lamp brings a thoughtful finishing touch to any room.' },
  { id: 6, name: 'Essential everyday backpack', category: 'Fashion', price: 72, original: 99, rating: 4.8, reviews: 765, image: 'photo-1553062407-98eeb64c6a62', color: '#e7ebec', badge: 'TOP RATED', description: 'Thoughtful pockets, a padded laptop sleeve, and a weather-resistant finish. Ready for wherever the day takes you.' },
  { id: 7, name: 'Pour-over coffee starter kit', category: 'Home', price: 44, original: 58, rating: 4.6, reviews: 541, image: 'photo-1495474472287-4d71bcdd2085', color: '#e9e4dc', badge: '−24%', description: 'Everything you need to make a slower, more delicious cup. Includes a hand-finished dripper and a sturdy glass carafe.' },
  { id: 8, name: 'Everyday running trainers', category: 'Sports', price: 88, original: 118, rating: 4.7, reviews: 986, image: 'photo-1542291026-7eec264c27ff', color: '#e9eced', badge: '−25%', description: 'Light on your feet and made for the miles ahead. Responsive cushioning keeps things comfortable from the first step.' },
];

const categories = [
  { name: 'Electronics', icon: '⌁', tint: '#e9f1ff' },
  { name: 'Fashion', icon: '♧', tint: '#fff1ea' },
  { name: 'Home', icon: '⌂', tint: '#e9f5ed' },
  { name: 'Beauty', icon: '✳', tint: '#f7eefa' },
  { name: 'Sports', icon: '↗', tint: '#fff4df' },
  { name: 'All finds', icon: '✦', tint: '#e9f3f5' },
];

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    truck: <><path d="M3 6h11v12H3z" /><path d="M14 10h4l3 3v5h-7z" /><circle cx="7.5" cy="18.5" r="1.5" /><circle cx="17.5" cy="18.5" r="1.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    grid: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></>,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-7h6v7" /></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    star: <path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 3Z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function ProductCard({ product, onOpen, onAdd, favorite, onFavorite }) {
  return (
    <article className="product-card">
      <button className="product-photo" onClick={onOpen} aria-label={`View ${product.name}`} style={{ backgroundColor: product.color }}>
        <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=85`} alt={product.name} />
        <span className="product-badge">{product.badge}</span>
      </button>
      <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label={favorite ? 'Remove from wishlist' : 'Add to wishlist'}><Icon name="heart" size={18} /></button>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <button className="product-name" onClick={onOpen}>{product.name}</button>
        <div className="product-rating"><span>★</span> {product.rating} <span className="review-count">({product.reviews.toLocaleString()})</span></div>
        <div className="product-price"><strong>${product.price}</strong><del>${product.original}</del><span>{Math.round((1 - product.price / product.original) * 100)}% off</span></div>
        <button className="add-button" onClick={onAdd}><Icon name="plus" size={15} /> Add to cart</button>
      </div>
    </article>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All finds');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState({});
  const [toast, setToast] = useState('');
  const [address, setAddress] = useState('home');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartProducts = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = cartProducts.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => (category === 'All finds' || product.category === category) && (!term || `${product.name} ${product.category}`.toLowerCase().includes(term)));
  }, [search, category]);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(''), 2400);
  }

  function addToCart(product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    notify(`${product.name} added to your bag`);
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  }

  function toggleWishlist(product) {
    setWishlist((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id]);
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openCategory(name) {
    setCategory(name);
    setSearch('');
    setPage('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openSearch() {
    setCategory('All finds');
    setPage('search');
  }

  function go(pageName) {
    setPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'categories', label: 'Categories', icon: 'grid' },
    { id: 'orders', label: 'Orders', icon: 'list' },
    { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];
  const standardPages = ['home', 'search', 'categories', 'listing', 'details', 'wishlist', 'cart', 'address', 'checkout', 'orders', 'order-details', 'profile'];

  return (
    <div className="app-shell">
      <div className="announcement"><span>THE LITTLE THINGS, DELIVERED</span><i /> Free delivery on your first order <button onClick={() => go('listing')}>Discover the edit <Icon name="arrow" size={13} /></button></div>
      <header className="topbar">
        <button className="brand" onClick={() => go('home')} aria-label="SwiftMarket home"><span className="brand-mark"><Icon name="bag" size={20} /></span><span>swift<span>market</span><small>GOOD FINDS. GOOD FEELING.</small></span></button>
        <button className="delivery-pill" onClick={() => go('address')}><Icon name="pin" size={18} /><span><small>DELIVERING TO</small><strong>Brooklyn, NY 11211</strong></span><span className="chevron">⌄</span></button>
        <form className="header-search" onSubmit={(event) => { event.preventDefault(); openSearch(); }}>
          <Icon name="search" size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} onFocus={() => { if (page === 'home') setPage('search'); }} placeholder="Search for something lovely..." aria-label="Search products" /><kbd>↵</kbd>
        </form>
        <div className="header-actions">
          <button className="icon-action notification-action" onClick={() => notify('You’re all caught up — check back for something lovely.')} aria-label="Notifications"><Icon name="bell" size={21} /><i /></button>
          <button className="icon-action" onClick={() => go('wishlist')} aria-label="Wishlist"><Icon name="heart" size={21} />{wishlist.length > 0 && <span className="action-count">{wishlist.length}</span>}</button>
          <button className="icon-action cart-action" onClick={() => go('cart')} aria-label={`Shopping bag, ${cartCount} items`}><Icon name="bag" size={21} />{cartCount > 0 && <span className="action-count">{cartCount}</span>}</button>
          <button className="avatar-button" onClick={() => go('profile')} aria-label="Your profile">J</button>
        </div>
      </header>
      <div className="desktop-nav">
        <nav aria-label="Shop categories">
          <button className={page === 'home' ? 'selected' : ''} onClick={() => go('home')}>Discover</button>
          {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map((name) => <button key={name} className={category === name && page === 'listing' ? 'selected' : ''} onClick={() => openCategory(name)}>{name}</button>)}
          <button className="nav-sale" onClick={() => openCategory('All finds')}>The under $50 edit <span>↗</span></button>
        </nav>
        <span className="nav-note"><Icon name="truck" size={15} /> Thoughtful finds, right on time</span>
      </div>

      <main className="main-content">
        {page === 'home' && <HomePage onCategory={openCategory} onOpen={openProduct} onAdd={addToCart} onFavorite={toggleWishlist} wishlist={wishlist} onListing={() => openCategory('All finds')} />}
        {page === 'search' && <SearchPage query={search} setSearch={setSearch} products={filteredProducts} onOpen={openProduct} onAdd={addToCart} onFavorite={toggleWishlist} wishlist={wishlist} onCategory={openCategory} />}
        {page === 'categories' && <CategoriesPage onCategory={openCategory} />}
        {page === 'listing' && <ListingPage category={category} products={filteredProducts} onOpen={openProduct} onAdd={addToCart} onFavorite={toggleWishlist} wishlist={wishlist} onCategory={openCategory} />}
        {page === 'details' && <ProductDetails product={selectedProduct} favorite={wishlist.includes(selectedProduct.id)} onFavorite={() => toggleWishlist(selectedProduct)} onAdd={() => addToCart(selectedProduct)} onBuy={() => { addToCart(selectedProduct); go('cart'); }} />}
        {page === 'wishlist' && <WishlistPage items={products.filter((product) => wishlist.includes(product.id))} onOpen={openProduct} onAdd={addToCart} onFavorite={toggleWishlist} />}
        {page === 'cart' && <CartPage items={cartProducts} cart={cart} subtotal={subtotal} onQuantity={changeQuantity} onOpen={openProduct} onShop={() => go('home')} onCheckout={() => go('address')} />}
        {page === 'address' && <AddressPage selected={address} onSelect={setAddress} onBack={() => go('cart')} onContinue={() => go('checkout')} />}
        {page === 'checkout' && <CheckoutPage address={address} subtotal={subtotal} onBack={() => go('address')} onPlaceOrder={() => { setOrderPlaced(true); setCart({}); go('confirmation'); }} />}
        {page === 'confirmation' && <ConfirmationPage onOrders={() => go('orders')} onHome={() => go('home')} />}
        {page === 'orders' && <OrdersPage onDetails={() => go('order-details')} />}
        {page === 'order-details' && <OrderDetailsPage onBack={() => go('orders')} />}
        {page === 'profile' && <ProfilePage onSignIn={() => go('welcome')} onAddress={() => go('address')} onOrders={() => go('orders')} />}
        {page === 'welcome' && <AuthPage mode="welcome" onMode={go} onContinue={() => go('home')} />}
        {page === 'login' && <AuthPage mode="login" onMode={go} onContinue={() => { notify('You’re signed in for this demo'); go('home'); }} />}
        {page === 'signup' && <AuthPage mode="signup" onMode={go} onContinue={() => { notify('Your demo account is ready'); go('home'); }} />}
        {page === 'splash' && <SplashPage onContinue={() => go('welcome')} />}
      </main>

      {standardPages.includes(page) && (
        <footer className="bottom-nav" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.id} className={page === item.id || (item.id === 'categories' && page === 'listing') ? 'active' : ''} onClick={() => go(item.id)}><span className="bottom-icon"><Icon name={item.icon} size={20} />{item.id === 'wishlist' && wishlist.length > 0 && <i />}</span><span>{item.label}</span></button>)}
          <span className="bottom-indicator" />
        </footer>
      )}
      {toast && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={15} /></span>{toast}<button onClick={() => go('cart')}>View bag</button></div>}
      {orderPlaced && <span className="sr-only">Your demo order has been placed.</span>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, link, onClick }) {
  return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{link && <button className="text-link" onClick={onClick}>{link}<Icon name="arrow" size={15} /></button>}</div>;
}

function HomePage({ onCategory, onOpen, onAdd, onFavorite, wishlist, onListing }) {
  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy"><span className="hero-kicker"><i /> THE WEEKEND EDIT</span><h1>A little more<br />lovely, every day.</h1><p>Good things for your everyday, picked with a little extra care.</p><button className="primary-button" onClick={onListing}>Shop the collection <Icon name="arrow" size={17} /></button><div className="hero-footnote"><span>01</span><i /><span>03</span><span>Thoughtfully picked for you</span></div></div>
        <div className="hero-art"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1250&q=90" alt="A thoughtfully styled edit of everyday fashion and accessories" /><div className="hero-caption"><span>THE EVERYDAY EDIT</span><span>№ 08 — SPRING, 2025</span></div><div className="hero-sticker"><strong>find<br />your<br /><em>everyday</em></strong><span>little joys</span></div></div>
        <span className="hero-index">S / M&nbsp; — &nbsp;NO. 08</span>
      </section>
      <section className="category-section"><SectionHeading eyebrow="A GOOD PLACE TO START" title="Shop by mood" link="All categories" onClick={() => onCategory('All finds')} /><div className="category-list">{categories.map((item, index) => <button key={item.name} className="category-item" onClick={() => onCategory(item.name)}><span className={`category-icon category-${index}`} style={{ background: item.tint }}><span>{item.icon}</span></span><span>{item.name}</span></button>)}</div></section>
      <section className="deals-strip"><div className="deal-symbol">✳</div><span><strong>A good deal, just for you.</strong> Little upgrades, lovely prices — up to 35% off a few favorites.</span><button onClick={onListing}>Find your favorite <Icon name="arrow" size={15} /></button><span className="deal-flower">✳</span></section>
      <section className="products-section"><SectionHeading eyebrow="THE ONES YOU'LL LOVE" title="A few good things" link="See all finds" onClick={onListing} /><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} onAdd={() => onAdd(product)} favorite={wishlist.includes(product.id)} onFavorite={() => onFavorite(product)} />)}</div></section>
      <section className="editorial-banner"><div className="editorial-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85" alt="Warm, natural textures in a calm living room" /></div><div className="editorial-copy"><span className="eyebrow">A NOTE FROM OUR EDITORS</span><h2>Make room for<br /><em>the good stuff.</em></h2><p>Thoughtful pieces, everyday rituals, and little things that feel like you. Meet our edit for a home that feels more like home.</p><button className="text-link" onClick={() => onCategory('Home')}>Explore the home edit <Icon name="arrow" size={15} /></button></div><span className="editorial-note">MADE FOR SLOW MORNINGS</span></section>
      <section className="products-section recommendations"><SectionHeading eyebrow="JUST ADDED TO THE GOOD LIST" title="A few more to love" link="Browse everything" onClick={onListing} /><div className="product-grid">{products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} onAdd={() => onAdd(product)} favorite={wishlist.includes(product.id)} onFavorite={() => onFavorite(product)} />)}</div></section>
      <TrustFooter />
    </>
  );
}

function SearchPage({ query, setSearch, products: items, onOpen, onAdd, onFavorite, wishlist, onCategory }) {
  return <><div className="page-heading search-heading"><div><span className="eyebrow">YOUR NEXT GOOD FIND</span><h1>What are you looking for?</h1><p>Take your time. The good stuff is just around the corner.</p></div></div><div className="search-page-form"><Icon name="search" size={20} /><input autoFocus value={query} onChange={(event) => setSearch(event.target.value)} placeholder="Try “something cozy” or “headphones”" /><button onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" size={18} /></button></div><div className="quick-searches"><span>GOOD PLACES TO START</span>{['Headphones', 'Home', 'Sneakers', 'Under $50'].map((term) => <button key={term} onClick={() => { setSearch(term === 'Under $50' ? '' : term); if (term === 'Under $50') onCategory('All finds'); }}>{term} <Icon name="arrow" size={13} /></button>)}</div>{items.length > 0 ? <section className="products-section listing-products"><SectionHeading eyebrow={`${items.length} THOUGHTFUL FINDS`} title={query ? `Results for “${query}”` : 'A few ideas for you'} /><div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} onAdd={() => onAdd(product)} favorite={wishlist.includes(product.id)} onFavorite={() => onFavorite(product)} />)}</div></section> : <EmptyState icon="search" title="No finds just yet" description="Try another search — the right little thing is out there." action="Browse everything" onAction={() => { setSearch(''); onCategory('All finds'); }} />}</>;
}

function CategoriesPage({ onCategory }) {
  return <><div className="page-heading"><span className="eyebrow">FIND YOUR KIND OF THING</span><h1>A little something<br />for every corner.</h1><p>Good things, thoughtfully gathered. Take a look around.</p></div><section className="category-page-grid">{categories.map((item, index) => <button key={item.name} className={`category-tile category-tile-${index}`} onClick={() => onCategory(item.name)}><span className="tile-icon" style={{ background: item.tint }}>{item.icon}</span><span><strong>{item.name}</strong><small>{['Clever tech, everyday better', 'Pieces that feel like you', 'Make yourself at home', 'A little everyday ritual', 'For wherever you’re going', 'The whole good list'][index]}</small></span><Icon name="arrow" size={17} /></button>)}</section><TrustFooter /></>;
}

function ListingPage({ category, products: items, onOpen, onAdd, onFavorite, wishlist, onCategory }) {
  const label = category === 'All finds' ? 'The good list' : category;
  return <><div className="listing-top"><div><button className="back-link" onClick={() => onCategory('All finds')}><Icon name="back" size={15} /> All finds</button><span className="eyebrow">THOUGHTFULLY PICKED FOR YOU</span><h1>{label}<em> things.</em></h1><p>Good things for everyday living. Only the ones worth bringing home.</p></div><div className="listing-count">{items.length.toString().padStart(2, '0')} <span>good finds</span></div></div><div className="filter-row"><span>SHOP THE COLLECTION</span><div>{['All finds', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map((name) => <button className={category === name ? 'filter-active' : ''} key={name} onClick={() => onCategory(name)}>{name}</button>)}</div><span className="sort-note">A little bit of everything, in a good order ↕</span></div>{items.length ? <section className="products-section listing-products"><div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} onAdd={() => onAdd(product)} favorite={wishlist.includes(product.id)} onFavorite={() => onFavorite(product)} />)}</div></section> : <EmptyState title="No finds in this collection" description="Our shelves are being restocked. Have a peek at something else." action="Shop all finds" onAction={() => onCategory('All finds')} />}<TrustFooter /></>;
}

function ProductDetails({ product, favorite, onFavorite, onAdd, onBuy }) {
  return <div className="details-layout"><div className="details-gallery"><div className="detail-main-image" style={{ background: product.color }}><img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=1100&q=90`} alt={product.name} /><span>{product.badge}</span><button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label={favorite ? 'Remove from wishlist' : 'Add to wishlist'}><Icon name="heart" size={20} /></button></div><div className="image-caption"><span>GOOD THINGS, BETTER EVERY DAY.</span><span>01 / 03</span></div></div><div className="detail-copy"><button className="back-link" onClick={() => window.history.length > 1 ? window.history.back() : null}><Icon name="back" size={15} /> Back to finds</button><span className="eyebrow">{product.category.toUpperCase()} &nbsp;·&nbsp; THOUGHTFULLY PICKED</span><h1>{product.name}<em>, made for every day.</em></h1><div className="detail-rating"><span>★★★★★</span> {product.rating} <button>({product.reviews.toLocaleString()} reviews)</button></div><div className="detail-price"><strong>${product.price}</strong><del>${product.original}</del><span>{Math.round((1 - product.price / product.original) * 100)}% off</span></div><p className="detail-description">{product.description}</p><div className="offer-card"><span className="offer-icon">✳</span><span><strong>A little something extra</strong><small>Take 10% off your first order over $50 with code <b>HELLO10</b></small></span></div><div className="detail-shipping"><span><Icon name="truck" size={19} /><span><strong>On your doorstep by Thursday</strong><small>Free delivery on orders over $50</small></span></span><span><Icon name="shield" size={19} /><span><strong>A little peace of mind</strong><small>Easy, free 30-day returns</small></span></span></div><div className="detail-actions"><button className="primary-button" onClick={onAdd}><Icon name="bag" size={17} /> Add to bag — ${product.price}</button><button className="buy-now-button" onClick={onBuy}>Buy it now <Icon name="arrow" size={16} /></button></div><span className="secure-note"><Icon name="lock" size={13} /> A secure, worry-free checkout</span><div className="specs-card"><span>THE LITTLE DETAILS</span><p><b>Thoughtful materials</b><span>Made to feel good, and made to last</span></p><p><b>Delivery, your way</b><span>Choose a delivery date at checkout</span></p></div></div></div>;
}

function WishlistPage({ items, onOpen, onAdd, onFavorite }) {
  return <><div className="page-heading compact-heading"><span className="eyebrow">THE GOOD THINGS YOU SAVED</span><h1>Your little wish list.</h1><p>A good place to keep the things you’re coming back for.</p><span className="heading-count">{items.length} {items.length === 1 ? 'find' : 'finds'}</span></div>{items.length ? <section className="products-section listing-products"><div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} onOpen={() => onOpen(product)} onAdd={() => onAdd(product)} favorite onFavorite={() => onFavorite(product)} />)}</div></section> : <EmptyState icon="heart" title="Save room for something lovely." description="Tap the little heart on any find to keep it right here for later." action="Explore the good list" onAction={() => onOpen(products[0])} />}</>;
}

function CartPage({ items, cart, subtotal, onQuantity, onOpen, onShop, onCheckout }) {
  if (!items.length) return <><div className="page-heading compact-heading"><span className="eyebrow">YOUR LITTLE BAG</span><h1>Room for something lovely.</h1></div><EmptyState icon="bag" title="Your bag is taking a breather." description="A few thoughtful finds might be just the thing." action="Find something lovely" onAction={onShop} /></>;
  return <><div className="page-heading compact-heading"><span className="eyebrow">JUST THE GOOD STUFF</span><h1>Your bag, your good things.</h1><p>A lovely little collection, if we do say so ourselves.</p><span className="heading-count">{Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)} items</span></div><div className="cart-layout"><div className="cart-items">{items.map((product) => <article className="cart-item" key={product.id}><button className="cart-image" style={{ background: product.color }} onClick={() => onOpen(product)}><img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=340&q=80`} alt={product.name} /></button><div className="cart-item-info"><span className="product-category">{product.category}</span><button className="cart-name" onClick={() => onOpen(product)}>{product.name}</button><small>Ready to make your day a little better.</small><div className="quantity-stepper"><button onClick={() => onQuantity(product.id, -1)} aria-label="Remove one"><Icon name="minus" size={14} /></button><span>{cart[product.id]}</span><button onClick={() => onQuantity(product.id, 1)} aria-label="Add one"><Icon name="plus" size={14} /></button></div></div><div className="cart-item-price"><strong>${(product.price * cart[product.id]).toFixed(2)}</strong><del>${(product.original * cart[product.id]).toFixed(2)}</del><button onClick={() => onQuantity(product.id, -cart[product.id])}>Remove</button></div></article>)}<div className="cart-reassurance"><Icon name="truck" size={19} /><span><strong>Good news — delivery is on us.</strong><small>Because thoughtful things should arrive thoughtfully.</small></span><Icon name="check" size={17} /></div></div><OrderSummary subtotal={subtotal} cta="Make it yours" onAction={onCheckout} /></div><TrustFooter /></>;
}

function OrderSummary({ subtotal, cta, onAction, shippingFree = true }) {
  const delivery = shippingFree ? 0 : 5.99;
  return <aside className="summary-card"><span className="summary-overline">THE SHORT VERSION</span><h2>Your little total.</h2><div><span>Good things</span><span>${subtotal.toFixed(2)}</span></div><div><span>Delivery</span><span>{delivery ? `$${delivery.toFixed(2)}` : <em>On us ♡</em>}</span></div><div className="summary-total"><strong>All in</strong><strong>${(subtotal + delivery).toFixed(2)}</strong></div><button className="primary-button" onClick={onAction}>{cta} <Icon name="arrow" size={16} /></button><span className="secure-note"><Icon name="lock" size={13} /> Your details stay yours. Always.</span></aside>;
}

function AddressPage({ selected, onSelect, onBack, onContinue }) {
  const addresses = [{ id: 'home', title: 'Home, sweet home', name: 'Jamie Parker', detail: '214 Bedford Avenue, Apt 3B', city: 'Brooklyn, NY 11211', tag: 'HOME' }, { id: 'work', title: 'The day job', name: 'Jamie Parker', detail: '55 Washington Street, Floor 4', city: 'Brooklyn, NY 11201', tag: 'WORK' }];
  return <><div className="checkout-progress"><button onClick={onBack}>01 &nbsp;Bag</button><i /><span className="progress-active">02 &nbsp;Delivery</span><i /><span>03 &nbsp;The good bit</span></div><div className="page-heading compact-heading checkout-heading"><span className="eyebrow">FIRST, THE IMPORTANT DETAILS</span><h1>Where should we send the good stuff?</h1><p>Pick a spot and we’ll take it from here.</p></div><div className="address-layout"><div className="address-list">{addresses.map((item) => <button key={item.id} className={`address-card ${selected === item.id ? 'address-selected' : ''}`} onClick={() => onSelect(item.id)}><span className="radio-dot">{selected === item.id && <i />}</span><span className="address-main"><span className="address-tag">{item.tag}</span><strong>{item.title}</strong><span>{item.name}</span><span>{item.detail}</span><span>{item.city}</span></span><span className="address-edit">EDIT</span></button>)}<button className="add-address" onClick={() => onSelect(selected === 'other' ? 'home' : 'other')}><span>+</span><span><strong>{selected === 'other' ? 'Use my home address' : 'Add a different address'}</strong><small>We’ll remember it for next time (just in this demo).</small></span><Icon name="arrow" size={16} /></button></div><aside className="delivery-promise"><div className="promise-icon"><Icon name="truck" size={23} /></div><span className="eyebrow">A LITTLE DELIVERY PROMISE</span><h3>On its way to<br />you by <em>Thursday.</em></h3><p>Free standard delivery. We’ll keep your things safe and sound along the way.</p><div><Icon name="shield" size={15} /> Free, easy returns for 30 days</div><button className="primary-button" onClick={onContinue}>On to the next bit <Icon name="arrow" size={16} /></button></aside></div></>;
}

function CheckoutPage({ address, subtotal, onBack, onPlaceOrder }) {
  const [method, setMethod] = useState('card');
  return <><div className="checkout-progress"><button onClick={onBack}>01 &nbsp;Bag</button><i /><button onClick={onBack}>02 &nbsp;Delivery</button><i /><span className="progress-active">03 &nbsp;The good bit</span></div><div className="page-heading compact-heading checkout-heading"><span className="eyebrow">THE FINAL LITTLE DETAILS</span><h1>Let’s make it official.</h1><p>A demo checkout, just for you. No payment will be taken.</p></div><div className="checkout-layout"><div className="checkout-fields"><section className="checkout-section"><div className="checkout-section-heading"><span>01</span><h2>Good things, going to</h2><button onClick={onBack}>Change</button></div><div className="checkout-address"><Icon name="pin" size={19} /><span><strong>{address === 'work' ? 'The day job' : address === 'other' ? 'Your new address' : 'Home, sweet home'}</strong><small>Jamie Parker · {address === 'work' ? '55 Washington Street, Brooklyn, NY 11201' : address === 'other' ? 'New delivery address selected' : '214 Bedford Avenue, Apt 3B, Brooklyn, NY 11211'}</small></span><Icon name="check" size={16} /></div></section><section className="checkout-section"><div className="checkout-section-heading"><span>02</span><h2>How would you like to pay?</h2></div><div className="payment-options">{[{ id: 'card', title: 'Credit or debit card', detail: 'Visa, Mastercard, Amex', glyph: '▰' }, { id: 'wallet', title: 'Digital wallet', detail: 'Apple Pay or Google Pay', glyph: '◉' }].map((item) => <button key={item.id} className={`payment-option ${method === item.id ? 'payment-selected' : ''}`} onClick={() => setMethod(item.id)}><span className="radio-dot">{method === item.id && <i />}</span><span className="payment-glyph">{item.glyph}</span><span><strong>{item.title}</strong><small>{item.detail}</small></span>{method === item.id && <Icon name="check" size={16} />}</button>)}</div><p className="demo-payment"><Icon name="lock" size={14} /> This is a visual demo — no real payment details needed.</p></section><section className="checkout-section"><div className="checkout-section-heading"><span>03</span><h2>A note for future you</h2></div><div className="gift-note"><span>✳</span> Little things have a way of making a big day. ♡</div></section></div><OrderSummary subtotal={subtotal} cta="Place your demo order" onAction={onPlaceOrder} /></div></>;
}

function ConfirmationPage({ onOrders, onHome }) {
  return <div className="confirmation-wrap"><div className="confirmation-illustration"><span>✳</span><div><Icon name="check" size={37} /></div><i>♡</i></div><span className="eyebrow">AND NOW, THE GOOD PART</span><h1>Something lovely<br /><em>is on its way.</em></h1><p>Your demo order <strong>#SW-24088</strong> is all tucked in. We’ll have it at your door by Thursday.</p><div className="confirmation-meta"><div><span>ORDER NUMBER</span><strong>#SW-24088</strong></div><div><span>DELIVERING TO</span><strong>Brooklyn, NY 11211</strong></div><div><span>ORDER TOTAL</span><strong>All taken care of (in this demo ♡)</strong></div></div><div className="confirmation-actions"><button className="primary-button" onClick={onOrders}>See your order <Icon name="arrow" size={16} /></button><button className="text-link" onClick={onHome}>Find something else lovely</button></div><span className="confirmation-note">MADE WITH A LITTLE EXTRA CARE &nbsp; ✳</span></div>;
}

function OrdersPage({ onDetails }) {
  return <><div className="page-heading compact-heading"><span className="eyebrow">A LITTLE LOOK BACK</span><h1>Your good things.</h1><p>Everything you’ve found and fallen for, all in one place.</p></div><section className="order-list"><div className="order-list-heading"><strong>JUST THE BEGINNING</strong><span>1 good order</span></div><button className="order-card" onClick={onDetails}><span className="order-photo-stack"><img src={`https://images.unsplash.com/${products[0].image}?auto=format&fit=crop&w=180&q=70`} alt="" /><img src={`https://images.unsplash.com/${products[2].image}?auto=format&fit=crop&w=180&q=70`} alt="" /><img src={`https://images.unsplash.com/${products[3].image}?auto=format&fit=crop&w=180&q=70`} alt="" /></span><span className="order-card-copy"><span className="order-number">ORDER SW-24088 <i>·</i> MAY 14, 2025</span><strong>Your latest good things</strong><small>3 thoughtful finds · $396.00</small><span className="order-status"><i /> On its way to you</span></span><span className="order-card-arrow"><Icon name="arrow" size={18} /></span></button><p className="orders-note">NEED A HAND? &nbsp; <button onClick={() => window.alert('We’re always happy to help. This is a frontend demo, so no support request will be sent.')}>We’re right here for you →</button></p></section><TrustFooter /></>;
}

function OrderDetailsPage({ onBack }) {
  return <><div className="page-heading compact-heading"><button className="back-link" onClick={onBack}><Icon name="back" size={15} /> All orders</button><span className="eyebrow">THE JOY IS IN THE DETAILS</span><h1>Order SW-24088</h1><p>Placed May 14, 2025 · A lovely little order.</p></div><div className="order-detail-layout"><div className="tracking-card"><div className="tracking-icon"><Icon name="truck" size={23} /></div><span className="eyebrow">LOOKS LIKE IT'S ON THE WAY</span><h2>Your good things are<br /><em>almost there.</em></h2><p>Estimated delivery: Thursday, May 16</p><div className="tracking-steps"><span className="step-done"><i><Icon name="check" size={12} /></i><b>All wrapped up</b><small>May 14</small></span><span className="step-done"><i><Icon name="check" size={12} /></i><b>On its way</b><small>May 15</small></span><span><i /><b>At your door</b><small>May 16</small></span></div></div><div className="order-detail-items"><span className="eyebrow">THE GOOD THINGS IN YOUR ORDER</span>{products.slice(0, 3).map((product, index) => <div className="order-detail-item" key={product.id}><div style={{ background: product.color }}><img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=180&q=70`} alt={product.name} /></div><span><strong>{product.name}</strong><small>Qty {index === 0 ? 1 : 2} · {product.category}</small></span><b>${product.price}</b></div>)}<div className="order-address"><Icon name="pin" size={17} /><span><b>Home, sweet home</b><small>214 Bedford Avenue, Brooklyn, NY 11211</small></span></div></div></div></>;
}

function ProfilePage({ onSignIn, onAddress, onOrders }) {
  return <><div className="profile-hero"><div className="profile-avatar">J</div><div><span className="eyebrow">A LITTLE SPACE, JUST FOR YOU</span><h1>Hello, Jamie <em>♡</em></h1><p>Your good finds and everyday favorites, all in one spot.</p></div><button className="outline-button" onClick={onSignIn}>Sign in / Sign up</button></div><div className="profile-grid"><button className="profile-tile" onClick={onOrders}><span className="profile-tile-icon"><Icon name="list" size={20} /></span><strong>Your orders</strong><small>Follow your good things home.</small><Icon name="arrow" size={16} /></button><button className="profile-tile" onClick={onAddress}><span className="profile-tile-icon"><Icon name="pin" size={20} /></span><strong>Your addresses</strong><small>Make delivery feel like a breeze.</small><Icon name="arrow" size={16} /></button><button className="profile-tile" onClick={onSignIn}><span className="profile-tile-icon"><Icon name="user" size={20} /></span><strong>Your little details</strong><small>Just the things that make it you.</small><Icon name="arrow" size={16} /></button><button className="profile-tile" onClick={onSignIn}><span className="profile-tile-icon"><Icon name="heart" size={20} /></span><strong>Your saved finds</strong><small>A little wish list for a rainy day.</small><Icon name="arrow" size={16} /></button></div><div className="profile-signin-note"><span>✳</span><span><strong>New around here?</strong><small>A little hello goes a long way. Sign in or make yourself at home.</small></span><button onClick={onSignIn}>Say hello <Icon name="arrow" size={14} /></button></div><TrustFooter /></>;
}

function AuthPage({ mode, onMode, onContinue }) {
  const welcome = mode === 'welcome';
  const signup = mode === 'signup';
  return <div className="auth-wrap"><div className="auth-art"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85" alt="A colorful, thoughtfully curated wardrobe" /><div className="auth-art-copy"><span className="eyebrow">FIND YOUR EVERYDAY</span><h2>A little more<br /><em>lovely, every day.</em></h2><span>GOOD THINGS · GOOD FEELING · SWIFTMARKET</span></div></div><div className="auth-form-wrap"><button className="brand auth-brand" onClick={() => onMode('home')}><span className="brand-mark"><Icon name="bag" size={20} /></span><span>swift<span>market</span><small>GOOD FINDS. GOOD FEELING.</small></span></button><div className="auth-form"><span className="eyebrow">{welcome ? 'YOUR NEXT GOOD THING STARTS HERE' : signup ? 'A LITTLE HELLO GOES A LONG WAY' : 'GOOD TO HAVE YOU BACK'}</span><h1>{welcome ? 'Come on in.' : signup ? 'Make yourself at home.' : 'Welcome back.'}</h1><p>{welcome ? 'Find the little things that make every day feel a bit more you.' : signup ? 'A few little details, then you’re one of us.' : 'Your good finds have missed you.'}</p>{!welcome && <><label>Your email address<input type="email" placeholder="you@example.com" /></label><label>Your password<input type="password" placeholder="At least 8 characters" /></label>{!signup && <button className="forgot-link" onClick={() => window.alert('Password reset is a visual demo only.')}>Forgot password?</button>}</>}<button className="primary-button" onClick={welcome ? () => onMode('login') : onContinue}>{welcome ? 'Sign in with email' : signup ? 'Create my account' : 'Sign in'} <Icon name="arrow" size={16} /></button><button className="social-button" onClick={onContinue}><span>G</span> Continue with Google</button><div className="auth-divider"><i /> <span>OR</span> <i /></div><button className="auth-switch" onClick={() => onMode(signup || welcome ? 'login' : 'signup')}>{welcome ? 'New here? Make yourself at home →' : signup ? 'Already have an account? Sign in →' : 'First time here? Create an account →'}</button><small className="auth-terms">Just a friendly demo. No account or authentication service required.</small></div></div></div>;
}

function SplashPage({ onContinue }) {
  return <div className="splash-screen"><span className="brand-mark"><Icon name="bag" size={26} /></span><h1>swift<span>market</span></h1><p>GOOD FINDS. GOOD FEELING.</p><button className="primary-button" onClick={onContinue}>Let’s find something lovely <Icon name="arrow" size={16} /></button></div>;
}

function EmptyState({ icon = 'bag', title, description, action, onAction }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name={icon} size={25} /></span><span className="eyebrow">A LITTLE SPACE FOR SOMETHING GOOD</span><h2>{title}</h2><p>{description}</p>{action && <button className="primary-button" onClick={onAction}>{action} <Icon name="arrow" size={15} /></button>}</div>;
}

function TrustFooter() {
  return <footer className="trust-footer"><div><Icon name="truck" size={19} /><span><strong>A little speed, a lot of care</strong><small>Free delivery over $50</small></span></div><div><Icon name="shield" size={19} /><span><strong>Finds you can feel good about</strong><small>Easy, free returns for 30 days</small></span></div><div><Icon name="heart" size={19} /><span><strong>A real person, always</strong><small>Here if you need a hand</small></span></div></footer>;
}

export default App;
