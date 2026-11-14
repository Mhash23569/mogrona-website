/* =====================================================================
   MOGRONA WEBSITE — ALL EDITABLE CONTENT LIVES IN THIS ONE FILE
   ---------------------------------------------------------------------
   To change text, add a product, add a recipe, add a shop, etc.,
   edit this file only. You never need to touch the other code files.

   Rules while editing:
     - Keep the quotation marks "like this" around text.
     - Keep the comma at the end of each line.
     - Picture paths are relative to the website folder,
       e.g. "images/products/my-photo.jpg".
     - If a picture file is missing, the site shows a tidy
       "Photo coming soon" panel instead of breaking.
   ===================================================================== */

window.MOGRONA = {

  /* ------------------------------------------------------------------
     1. COMPANY DETAILS
     Leave a value as "" (empty) and the site hides it automatically.
     ------------------------------------------------------------------ */
  site: {
    name: "Mogrona",
    tagline: "Premium Sweetener",
    company: "Mogrona Private Limited",
    address: "137, A3, PGECHS, PIA Road, Lahore, Pakistan - 54400",
    manufacturer: "Don Valley (Food Division), 31-km, Main Ferozepur Road, Lahore, Pakistan - 54400",

    email: "",       // e.g. "info@mogrona.com"  — also switches on the contact form
    phone: "",       // e.g. "+92 42 1234567"
    whatsapp: "",    // digits only with country code, e.g. "923001234567" — switches on "Order on WhatsApp"

    social: {        // full links, e.g. "https://www.instagram.com/mogrona"
      facebook: "",
      instagram: "",
      tiktok: "",
      youtube: ""
    },

    logo: "images/logo.png",        // put the logo file here; until then a text logo is shown
    heroImage: "images/hero.png",   // big picture at the top of the home page; until then the first product picture is used

    announcement: "Quiz: Find your perfect sweet swap",

    // The five boxes under the home page banner (same as on the carton)
    badges: [
      ["No", "Stevia"],
      ["Zero", "Fat"],
      ["Zero", "Calories"],
      ["Zero", "Carbs"],
      ["حلال", "Halal"]
    ]
  },

  /* ------------------------------------------------------------------
     2. PRODUCTS
     To add a product: copy everything from the opening { to the closing },
     paste it after the last product (with a comma between), and change
     the details. The menus, home page and product pages update themselves.

     Pictures: list as many as you like in "images". The first one is the
     main picture. Any shape or size works — the site fits them itself.
     Files listed here that do not exist yet are simply skipped.
     ------------------------------------------------------------------ */
  products: [
    {
      id: "monk-fruit-sachets-50",              // used in the page link; lowercase, no spaces
      name: "Mogrona Monk Fruit Sweetener",
      pack: "50 Sachets",
      short: "A natural sugar replacement made from monk fruit extract, in handy 1.5 g sachets.",
      description: [
        "Mogrona Monk Fruit Sweetener gives you the sweetness you love with zero calories. It is made from monk fruit extract, a naturally sweet extract of the small green fruit that has been prized for its sweetness for centuries.",
        "Each sachet is as sweet as two teaspoons of sugar. Tear one open and stir it into chai, coffee, cold drinks, yogurt or oats."
      ],
      size: "50 sachets × 1.5 g (net weight 75 g)",
      price: "",                                // e.g. "Rs. 1,250" — leave "" to hide
      buyUrl: "",                               // link to an online shop page for this product — leave "" to use the Where to Buy page
      images: [
        "images/products/monk-fruit-sachets-50-1.png",
        "images/products/monk-fruit-sachets-50-2.png",
        "images/products/monk-fruit-sachets-50-3.png",
        "images/products/monk-fruit-sachets-50-4.png"
      ],
      facts: [
        "Zero calories",
        "Zero fat",
        "No stevia",
        "Plant based",
        "Gluten free",
        "Halal"
      ],
      ingredients: "Monk fruit extract, erythritol",
      sweetness: "One sachet is equal to 2 teaspoons of sugar.",
      sachetTsp: 2,                             // how many teaspoons of sugar one sachet replaces
      storage: "Store in a cool, dry place.",
      nutrition: {
        servings: "50 servings per container",
        servingSize: "1 sachet (1.5 g)",
        calories: "0",
        rows: [                                 // [name, amount, % daily value]
          ["Total Fat", "0 g", "0%"],
          ["Sodium", "0 mg", "0%"],
          ["Total Carbohydrate", "<1 g", "0%"],
          ["Protein", "0 g", "0%"]
        ]
      }
    }
  ],

  /* ------------------------------------------------------------------
     3. WHERE TO BUY
     Add each shop or website that sells Mogrona. While this list is
     empty the page shows a "coming soon" message.
     Example (remove the two slashes at the start of each line to use):
     ------------------------------------------------------------------ */
  stores: [
    // { name: "Example Supermarket", type: "store",  city: "Lahore", url: "" },
    // { name: "Example Online Shop", type: "online", city: "",       url: "https://www.example.com/mogrona" }
  ],

  /* ------------------------------------------------------------------
     4. RECIPES
     Picture for each recipe goes in images/recipes/ with the file name
     written in "image".
     ------------------------------------------------------------------ */
  recipes: [
    {
      id: "karak-chai",
      title: "Sugar-Free Karak Chai",
      category: "Drinks",
      time: "10 minutes",
      serves: "2",
      image: "images/recipes/karak-chai.jpg",
      intro: "Strong, milky and fragrant with cardamom — everyday chai without the sugar.",
      ingredients: [
        "1½ cups water",
        "2 teaspoons black tea leaves",
        "2 green cardamom pods, lightly crushed",
        "1 cup milk",
        "2 Mogrona sachets (1 per cup), or to taste"
      ],
      steps: [
        "Bring the water, tea leaves and cardamom to a boil in a saucepan and let it bubble for 2–3 minutes.",
        "Pour in the milk and simmer for 3–4 minutes, until the chai turns a deep caramel colour.",
        "Strain into two cups.",
        "Stir one Mogrona sachet into each cup and serve hot."
      ]
    },
    {
      id: "iced-coffee",
      title: "Creamy Iced Coffee",
      category: "Drinks",
      time: "5 minutes",
      serves: "1",
      image: "images/recipes/iced-coffee.jpg",
      intro: "A café-style cold coffee you can make at home in minutes.",
      ingredients: [
        "2 teaspoons instant coffee",
        "2 tablespoons hot water",
        "1 Mogrona sachet, or to taste",
        "1 cup chilled milk",
        "A handful of ice cubes"
      ],
      steps: [
        "Stir the coffee and Mogrona into the hot water until completely dissolved.",
        "Fill a tall glass with ice and pour in the chilled milk.",
        "Pour the coffee over the top, stir and enjoy."
      ]
    },
    {
      id: "mint-lemonade",
      title: "Mint Lemonade (Nimbu Pani)",
      category: "Drinks",
      time: "5 minutes",
      serves: "2",
      image: "images/recipes/mint-lemonade.jpg",
      intro: "Cool, tangy and refreshing — perfect for a hot afternoon.",
      ingredients: [
        "Juice of 2 lemons",
        "2 cups chilled water",
        "8–10 fresh mint leaves",
        "2 Mogrona sachets, or to taste",
        "A pinch of black salt (optional)",
        "Ice cubes"
      ],
      steps: [
        "Lightly crush the mint leaves in the bottom of a jug.",
        "Add the lemon juice, Mogrona and black salt, and stir until the sweetener dissolves.",
        "Pour in the chilled water, stir well and taste. Add a little more Mogrona if you like it sweeter.",
        "Serve over ice."
      ]
    },
    {
      id: "mango-lassi",
      title: "Mango Lassi",
      category: "Drinks",
      time: "5 minutes",
      serves: "2",
      image: "images/recipes/mango-lassi.jpg",
      intro: "Thick, fruity and naturally sweet from ripe mango, with no added sugar.",
      ingredients: [
        "1 cup ripe mango chunks",
        "1 cup plain yogurt",
        "½ cup cold milk or water",
        "1 Mogrona sachet, or to taste",
        "A pinch of ground cardamom (optional)",
        "A few ice cubes"
      ],
      steps: [
        "Put the mango, yogurt, milk and Mogrona in a blender.",
        "Blend until smooth and creamy. Add the ice and blend again briefly.",
        "Taste, adjust the sweetness, and pour into two glasses.",
        "Finish with a pinch of cardamom."
      ]
    },
    {
      id: "overnight-oats",
      title: "Overnight Oats",
      category: "Breakfast",
      time: "5 minutes, plus chilling overnight",
      serves: "1",
      image: "images/recipes/overnight-oats.jpg",
      intro: "Mix it at night and breakfast is ready when you wake up.",
      ingredients: [
        "½ cup rolled oats",
        "½ cup milk",
        "¼ cup plain yogurt",
        "1 Mogrona sachet",
        "1 tablespoon chia seeds (optional)",
        "Fresh fruit and chopped nuts, to serve"
      ],
      steps: [
        "Stir the oats, milk, yogurt, Mogrona and chia seeds together in a jar or bowl.",
        "Cover and leave in the fridge overnight, or for at least 4 hours.",
        "Stir, loosen with a splash of milk if needed, and top with fruit and nuts."
      ]
    },
    {
      id: "fruit-yogurt-parfait",
      title: "Fruit & Yogurt Parfait",
      category: "Snacks",
      time: "10 minutes",
      serves: "2",
      image: "images/recipes/fruit-yogurt-parfait.jpg",
      intro: "Layers of sweetened yogurt, fresh fruit and crunchy nuts.",
      ingredients: [
        "1 cup thick plain yogurt",
        "1 Mogrona sachet",
        "½ teaspoon vanilla essence",
        "1 cup chopped seasonal fruit",
        "2 tablespoons chopped nuts"
      ],
      steps: [
        "Stir the Mogrona and vanilla into the yogurt until smooth.",
        "Spoon a layer of yogurt into two glasses, then a layer of fruit.",
        "Repeat the layers and finish with the chopped nuts.",
        "Serve straight away, or chill for up to an hour."
      ]
    }
  ],

  /* ------------------------------------------------------------------
     5. BLOG ARTICLES
     "body" is a list. Plain text = a paragraph.
     ["h", "text"] = a sub-heading.   ["ul", ["a", "b"]] = a bullet list.
     ------------------------------------------------------------------ */
  posts: [
    {
      id: "what-is-monk-fruit",
      title: "What Is Monk Fruit? A Simple Guide",
      date: "2026-11-14",
      image: "images/blog/what-is-monk-fruit.jpg",
      summary: "Meet the small green fruit behind Mogrona, and find out why it tastes sweet without the calories.",
      body: [
        "Monk fruit, also known as luo han guo, is a small green fruit that grows on a vine in the mountains of southern China. It has been grown there for centuries, and it is said to be named after the monks who first cultivated it.",
        ["h", "Why is it sweet?"],
        "Most fruits are sweet because of their natural sugars. Monk fruit is different. Its intense sweetness comes from natural compounds called mogrosides. Monk fruit extract is commonly described as 100 to 250 times sweeter than sugar, yet it adds no calories.",
        ["h", "Why is it blended with erythritol?"],
        "Because the extract is so sweet, only a tiny amount is needed, far too little to measure with a spoon. Mogrona blends monk fruit extract with erythritol so that every sachet pours easily and gives the same sweetness every time: the equal of two teaspoons of sugar.",
        ["h", "How do people use it?"],
        ["ul", [
          "Stirred into chai, coffee and green tea",
          "In cold drinks such as lemonade, lassi and milkshakes",
          "Sprinkled over yogurt, fruit, oats and cereal"
        ]],
        "If you are new to monk fruit, start with your daily cup of tea. It is the easiest sweet swap there is."
      ]
    },
    {
      id: "easy-ways-to-cut-sugar",
      title: "5 Easy Ways to Cut Back on Sugar",
      date: "2026-11-14",
      image: "images/blog/easy-ways-to-cut-sugar.jpg",
      summary: "Small, realistic changes that make a real difference to how much sugar you eat and drink each day.",
      body: [
        "The World Health Organization recommends keeping free sugars below 10% of your daily energy intake, and suggests that going below 5% (roughly 25 grams, or about 6 teaspoons, a day for an adult) brings additional benefits. For many of us, a few cups of sweet tea are enough to pass that mark. Here are five simple places to start.",
        ["h", "1. Start with your drinks"],
        "Tea, coffee, juices and soft drinks are where much of our daily sugar hides. Swapping the sugar in the cups you already drink is the quickest win.",
        ["h", "2. Sweeten it yourself"],
        "Buy plain yogurt, plain oats and unsweetened drinks, then add the sweetness yourself. You stay in control of how much goes in.",
        ["h", "3. Read the label"],
        "Check the sugar line on packaged foods. Sauces, cereals and flavoured yogurts often contain more than you would expect.",
        ["h", "4. Make one swap at a time"],
        "Change one habit this week, such as your morning chai, and add another next week. Small steps are easier to keep.",
        ["h", "5. Keep a sachet handy"],
        "Keep a few Mogrona sachets in your bag, your desk and your car, so the sugar bowl is never the only option.",
        "This article is general information and not medical advice. If you have a health condition, follow the guidance of your doctor or dietitian."
      ]
    },
    {
      id: "how-to-use-mogrona",
      title: "How to Use Mogrona in Your Kitchen",
      date: "2026-11-14",
      image: "images/blog/how-to-use-mogrona.jpg",
      summary: "From your first cup of chai to cold drinks and breakfast bowls: a quick guide to getting the sweetness right.",
      body: [
        "Switching from sugar to Mogrona is simple once you know one rule: one sachet is as sweet as two teaspoons of sugar.",
        ["h", "In hot drinks"],
        "Stir a sachet into chai, coffee or green tea just as you would sugar. If you normally take one teaspoon of sugar, start with half a sachet.",
        ["h", "In cold drinks"],
        "For lemonade, lassi and iced coffee, dissolve the sweetener in a little liquid first, then add the rest and the ice.",
        ["h", "In cooking and baking"],
        "Monk fruit sweetener is heat-stable, so you can cook with it. In baking, remember that sugar also adds bulk, browning and moisture, so cakes and biscuits may need some adjusting when you leave it out.",
        ["h", "Taste as you go"],
        "Everyone's sweet tooth is different. Start with a little less than you think you need, taste, and add more if you want it."
      ]
    }
  ],

  /* ------------------------------------------------------------------
     6. FREQUENTLY ASKED QUESTIONS   [question, answer]
     ------------------------------------------------------------------ */
  faqs: [
    ["What is Mogrona?",
     "Mogrona is a premium zero-calorie sweetener made from monk fruit extract. It comes in handy 1.5 g sachets, and one sachet gives the sweetness of two teaspoons of sugar."],
    ["What is monk fruit?",
     "Monk fruit, also called luo han guo, is a small green fruit native to southern China. Its sweetness comes from natural compounds called mogrosides, which are many times sweeter than sugar but add no calories."],
    ["What are the ingredients?",
     "Just two: monk fruit extract and erythritol. Mogrona contains no stevia."],
    ["What is erythritol, and why is it in Mogrona?",
     "Erythritol is a sugar alcohol that occurs naturally in some fruits. Monk fruit extract is so sweet that only a tiny amount is needed, so erythritol is added to give each sachet enough body to pour and measure easily."],
    ["How much should I use?",
     "One sachet is equal to two teaspoons of sugar. If you usually take one teaspoon of sugar, start with half a sachet and adjust to taste."],
    ["Can I use it in hot drinks and cooking?",
     "Yes. Monk fruit sweetener is heat-stable, so it works in hot drinks and in cooking. In baking, sugar also adds bulk, browning and moisture, so some recipes may need adjusting."],
    ["Is Mogrona suitable for people with diabetes?",
     "Mogrona has zero calories and contains no sugar, and the pack is labelled as suitable for weight control and diabetes. Everyone's needs are different, so please follow the advice of your doctor or dietitian."],
    ["Is Mogrona halal?",
     "Yes. Mogrona carries the Halal mark on its pack."],
    ["Is it plant based and gluten free?",
     "Yes. Mogrona is plant based and gluten free."],
    ["How should I store it?",
     "Store it in a cool, dry place."],
    ["Who makes Mogrona?",
     "Mogrona is marketed by Mogrona Private Limited, Lahore, and manufactured by Don Valley (Food Division), Lahore, Pakistan."],
    ["Where can I buy Mogrona?",
     "Please see our Where to Buy page for the latest list of shops and online stores."]
  ]
};
