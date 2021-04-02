const presence = new Presence({
  clientId: "827620297896230912"
}),
browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
const presenceData = {
      largeImageKey: "logo"
    },
    set_timeElapsed = await presence.getSetting("timeElapsed"),
    set_showButtons = await presence.getSetting("showButtons"),
    urlpath = window.location.pathname.split("/");

if (set_timeElapsed) {
  presenceData.startTimestamp = browsingStamp;
}
if(!urlpath[1]) {
  presenceData.details = "Home";
} else if (urlpath[1] === "c") {
  const num = (urlpath[2] === 'men' || urlpath[2] === 'women' || urlpath[2] === 'kids') ? "3" : "2";
  if(document.querySelector("a.b-refinements-category-link.active")){
    const category = document.querySelector("a.b-refinements-category-link.active").getAttribute("data-name");
    presenceData.state = (urlpath[parseInt(num) + 1]) ? category : "";
  }
  if(set_showButtons) {
    presenceData.buttons = [
      {
        label: 'Show Category',
        url: window.location.href
      }
    ];
  }

  if(urlpath[num] === 'new') {
    presenceData.details = "New";
  } else if(urlpath[num] === 'shoes') {
    presenceData.details = "Shoes";
  } else if(urlpath[num] === 'clothing') {
    presenceData.details = "Clothing";
  } else if(urlpath[num] === 'accessories') {
    presenceData.details = "Accessoires";
  } else if(urlpath[2] === 'brands') {
    presenceData.details = "Brands";
    if(urlpath[3]) {
      presenceData.state = document.querySelector("li.b-breadcrumb-item>span.b-breadcrumb-text").textContent;
    }
  } else if(urlpath[2] === 'sale') {
    presenceData.details = "Sale";
  } else if(urlpath[2] === 'deals') {
    presenceData.details = "Deals";
  } else if(urlpath[2] === 'musthaves') {
    presenceData.details = "Must haves";
  } else if(document.querySelector("li.b-breadcrumb-item>span.b-breadcrumb-text")) {
    presenceData.details = "Category:";
    presenceData.state = document.querySelector("li.b-breadcrumb-item>span.b-breadcrumb-text").textContent;
  }
} else if (urlpath[1] === "p") {
  const prod = document.querySelector("div.js-target").textContent,
        prodModel = document.querySelector("div.js-target>.h-hide").textContent,
        brand = document.querySelector("div.js-target>a").textContent,
        product = prod.replace(prodModel, "").replace(brand, "").replace(/\s+/g, " ").trim();
  if(set_showButtons) {
    presenceData.buttons = [
      {
        label: 'Show Product',
        url: window.location.href
      }
    ];
  }

  presenceData.details = brand;
  presenceData.state = product;
} else if (urlpath[1].startsWith("search")) {
  const urlParams = new URLSearchParams(window.location.search);
  presenceData.details = "Search:";
  presenceData.state = urlParams.get('q');

  if(set_showButtons) {
    presenceData.buttons = [
      {
        label: 'Show Results',
        url: window.location.href
      }
    ];
  }
} else if (urlpath[1] === "view-account") {
  presenceData.details = "Account";
} else if (urlpath[1] === "edit-account") {
  presenceData.details = "Editing account";
} else if (urlpath[1] === "cliqueoverview") {
  presenceData.details = "Clique";
} else if (urlpath[1] === "edit-password") {
  presenceData.details = "Editing password";
} else if (urlpath[1] === "order-history") {
  presenceData.details = "Order history";
} else if (urlpath[1] === "wishlist") {
  presenceData.details = "Wishlist";
} else if (urlpath[1] === "cart") {
  presenceData.details = "Shopping cart";
} else if (urlpath[1] === "addresses") {
  presenceData.details = "Addresses";
} else if (urlpath[1] === "newsletter-settings") {
  presenceData.details = "Newsletter";
} else if (urlpath[1] === "newsletter-preferences") {
  presenceData.details = "Newsletter settings";
} else if (urlpath[1] === "login") {
  presenceData.details = "Login";
} else if (urlpath[1] === "registration") {
    presenceData.details = "Register";
} else if (urlpath[1] === "storefinder") {
  presenceData.details = "Storefinder";
} else if (urlpath[1] === "content") {
  presenceData.details = "Other";
}
if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});
