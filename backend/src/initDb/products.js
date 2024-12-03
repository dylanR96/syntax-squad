import { PRODUCTS_TABLE } from "../constants/tableNames.js";
let productID = 101;
const productBatchWriteRequests = [
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Pepparkakor",
        ingredients: [
          { id: 10001, quantity: 250 }, // Vetemjöl (Flour) - 250g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10006, quantity: 5 }, // Vaniljsocker (Vanilla Sugar) - 5g
          { id: 10007, quantity: 10 }, // Kanel (Cinnamon) - 10g
          { id: 10010, quantity: 1 }, // Ägg (Eggs) - 1 piece
        ],
        tags: ["jul", "ägg", "gluten"],
        price: 45.0,
        specialOffer: 0,
        image: "https://images.unsplash.com/photo-1639590229762-3c9a8c98ca31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bakingTime: 15,
        description: "Krispiga och kryddiga pepparkakor, en klassisk julfavorit.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Lussekatter",
        ingredients: [
          { id: 10001, quantity: 500 }, // Vetemjöl (Flour) - 500g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10012, quantity: 10 }, // Jäst (Yeast) - 10g
          { id: 10014, quantity: 250 }, // Mjölk (Milk) - 250ml
          { id: 10010, quantity: 1 },  // Ägg (Eggs) - 1 piece
        ],
        tags: ["jul", "gluten", "laktos"],
        price: 60.0,
        specialOffer: 0,
        image: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_233915/cf_259/lussebullar_med_kvarg.jpg",
        bakingTime: 25,
        description: "Mjuka och gyllene lussekatter med doft av saffran.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Knäck",
        ingredients: [
          { id: 10003, quantity: 50 },  // Smör (Butter) - 50g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10014, quantity: 200 }, // Grädde (Cream) - 200ml
          { id: 10011, quantity: 50 },  // Honung (Honey) - 50g
          { id: 10008, quantity: 30 },  // Mandel (Almonds) - 30g
        ],
        tags: ["jul", "laktos", "trending"],
        price: 35.0,
        specialOffer: 1,
        image: "https://files-aller-blogger-platform.aws.aller.com/uploads/sites/87/2020/12/knack-recept-pa%CC%8A-knack.jpg",
        bakingTime: 20,
        description: "Sött och segt knäck, en självklarhet på julbordet.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Snabb Kladdkaka",
        ingredients: [
          { id: 10001, quantity: 200 }, // Vetemjöl (Flour) - 200g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10008, quantity: 50 },  // Kakao (Cocoa Powder) - 50g
          { id: 10010, quantity: 2 },   // Ägg (Eggs) - 2 pieces
        ],
        tags: ["15 min", "ägg", "trending"],
        price: 40.0,
        specialOffer: 0,
        image: "https://www.waynescoffee.se/wp-content/uploads/2022/01/kladdkaka-21.jpg",
        bakingTime: 15,
        description: "En snabb och kladdig chokladkaka som smälter i munnen.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Havrekakor",
        ingredients: [
          { id: 10001, quantity: 150 }, // Vetemjöl (Flour) - 150g
          { id: 10002, quantity: 100 }, // Socker (Sugar) - 100g
          { id: 10003, quantity: 75 },  // Smör (Butter) - 75g
          { id: 10008, quantity: 100 }, // Havregryn (Oats) - 100g
        ],
        tags: ["15 min", "gluten", "laktos"],
        price: 25.0,
        specialOffer: 1,
        image: "https://www.dansukker.se/Files/product-cataloge/recipe_large/raflor_oat_biscuits.jpg",
        bakingTime: 15,
        description: "Spröda havrekakor som passar perfekt till fikat.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Brownies",
        ingredients: [
          { id: 10001, quantity: 250 }, // Vetemjöl (Flour) - 250g
          { id: 10002, quantity: 200 }, // Socker (Sugar) - 200g
          { id: 10003, quantity: 150 }, // Smör (Butter) - 150g
          { id: 10008, quantity: 80 },  // Kakao (Cocoa Powder) - 80g
          { id: 10010, quantity: 3 },   // Ägg (Eggs) - 3 pieces
        ],
        tags: ["trending", "ägg", "gluten"],
        price: 50.0,
        specialOffer: 0,
        image: "https://images.cookforyourlife.org/wp-content/uploads/2020/06/Dark-Chocolate-Brownies-shutterstock_112430981.jpg",
        bakingTime: 30,
        description: "Fudgy brownies med en djup chokladsmak.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Kanelbullar",
        ingredients: [
          { id: 10001, quantity: 500 }, // Vetemjöl (Flour) - 500g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10012, quantity: 10 }, // Jäst (Yeast) - 10g
          { id: 10014, quantity: 300 }, // Mjölk (Milk) - 300ml
          { id: 10007, quantity: 10 }, // Kanel (Cinnamon) - 10g
        ],
        tags: ["trending", "gluten", "laktos"],
        price: 55.0,
        specialOffer: 0,
        image: "https://media.matspar.se/recept/kanelbullar_thumbnail.jpg",
        bakingTime: 40,
        description: "Mjuka och smakrika kanelbullar som passar året om.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Chokladchipkakor",
        ingredients: [
          { id: 10001, quantity: 200 }, // Vetemjöl (Flour) - 200g
          { id: 10002, quantity: 100 }, // Socker (Sugar) - 100g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10009, quantity: 50 },  // Chokladknappar (Chocolate Chips) - 50g
        ],
        tags: ["15 min", "gluten", "laktos"],
        price: 40.0,
        specialOffer: 0,
        image: "https://www.modernhoney.com/wp-content/uploads/2017/11/Thin-and-Crispy-Chocolate-Chip-Cookies-2.jpg",
        bakingTime: 12,
        description: "Knapriga kakor fyllda med chokladbitar.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Vaniljmuffins",
        ingredients: [
          { id: 10001, quantity: 200 }, // Vetemjöl (Flour) - 200g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10006, quantity: 5 },   // Vaniljsocker (Vanilla Sugar) - 5g
          { id: 10010, quantity: 2 },   // Ägg (Eggs) - 2 pieces
        ],
        tags: ["trending", "ägg", "gluten"],
        price: 35.0,
        specialOffer: 1,
        image: "https://lindasbakskola.se/app/uploads/sites/4/2018/10/skarmavbild-2018-10-29-kl-09-02-18.png",
        bakingTime: 20,
        description: "Fluffiga muffins med en mild vaniljsmak.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Franska Madeleinekakor",
        ingredients: [
          { id: 10001, quantity: 150 }, // Vetemjöl (Flour) - 150g
          { id: 10002, quantity: 120 }, // Socker (Sugar) - 120g
          { id: 10003, quantity: 80 },  // Smör (Butter) - 80g
          { id: 10010, quantity: 2 },   // Ägg (Eggs) - 2 pieces
        ],
        tags: ["15 min", "ägg", "laktos"],
        price: 45.0,
        specialOffer: 0,
        image: "https://www.freakykitchen.se/bilder/artiklar/zoom/11932_2.jpg",
        bakingTime: 10,
        description: "Små eleganta kakor med fransk touch.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Morotskaka",
        ingredients: [
          { id: 10001, quantity: 300 }, // Vetemjöl (Flour) - 300g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10010, quantity: 2 },   // Ägg (Eggs) - 2 pieces
        ],
        tags: ["trending", "gluten", "ägg"],
        price: 60.0,
        specialOffer: 1,
        image: "https://i0.wp.com/bakalite.se/app/uploads/sites/15/2024/07/Morotskaka-morotstarta-bakalite.se-2-scaled.jpg",
        bakingTime: 30,
        description: "Saftig morotskaka med härlig glasyr.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Småkakor med Mandel",
        ingredients: [
          { id: 10001, quantity: 150 }, // Vetemjöl (Flour) - 150g
          { id: 10002, quantity: 100 }, // Socker (Sugar) - 100g
          { id: 10003, quantity: 50 },  // Smör (Butter) - 50g
          { id: 10008, quantity: 100 }, // Mandelmjöl (Almond Flour) - 100g
        ],
        tags: ["15 min", "gluten", "laktos"],
        price: 40.0,
        specialOffer: 0,
        image: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_171441/cf_259/glutenfria_kardemummakakor_med_mandel.jpg",
        bakingTime: 15,
        description: "Knapriga småkakor med mandel för julens fika.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Mjuka Chokladrutor",
        ingredients: [
          { id: 10001, quantity: 250 }, // Vetemjöl (Flour) - 250g
          { id: 10002, quantity: 150 }, // Socker (Sugar) - 150g
          { id: 10003, quantity: 100 }, // Smör (Butter) - 100g
          { id: 10008, quantity: 50 },  // Kakao (Cocoa Powder) - 50g
          { id: 10010, quantity: 3 },   // Ägg (Eggs) - 3 pieces
        ],
        tags: ["15 min", "ägg", "gluten"],
        price: 50.0,
        specialOffer: 1,
        image: "https://brinkenbakar.se/wp-content/uploads/2018/05/choklad-och-zucchinikaka-3.jpg",
        bakingTime: 15,
        description: "Chokladrutor som är både mjuka och smakrika.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Saffransskorpor",
        ingredients: [
          { id: 10001, quantity: 300 }, // Vetemjöl (Flour) - 300g
          { id: 10002, quantity: 100 }, // Socker (Sugar) - 100g
          { id: 10003, quantity: 50 },  // Smör (Butter) - 50g
        ],
        tags: ["jul", "gluten", "laktos"],
        price: 30.0,
        specialOffer: 0,
        image: "https://ls-static.bonniernews.se/_alltommat_/1025/2024/11/saffransskorpor-skorpor-med-saffran-10.jpg?v1&org_if_sml=1&force_format=original",
        bakingTime: 25,
        description: "Knapriga saffransskorpor, perfekta till julens kaffe.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  },
  {
    PutRequest: {
      Item: {
        productID: productID++,
        productName: "Snöbollar",
        ingredients: [
          { id: 10001, quantity: 200 }, // Vetemjöl (Flour) - 200g
          { id: 10002, quantity: 120 }, // Socker (Sugar) - 120g
          { id: 10003, quantity: 80 },  // Smör (Butter) - 80g
          { id: 10016, quantity: 30 },  // Florsocker (Powdered Sugar) - 30g
        ],
        tags: ["jul", "laktos", "gluten"],
        price: 35.0,
        specialOffer: 0,
        image: "https://www.vinochmatguiden.se/bilder/artikel-hog/10220/snobollar.jpg",
        bakingTime: 10,
        description: "Små och söta snöbollar som smälter i munnen.",
        createdAt: new Date().toISOString(),
        recipe: [
          { 
            step: "Sätt på ugnen på 175 grader Celsius och förbered en rund bakform med löstagbar kant genom att smörja formen och eventuellt klä den med bakplåtspapper." 
          },
          { 
            step: "Smält smöret i en kastrull på medelvärme tills det är helt flytande. Ställ åt sidan och låt smöret svalna något för att undvika att det koagulerar äggen i nästa steg." 
          },
          { 
            step: "I en stor skål, vispa ihop socker, ägg och vaniljsocker tills blandningen är lätt och fluffig. Använd gärna en handvisp eller elvisp på låg hastighet." 
          } 
          
        ],
      },
    },
  }

];
export const productParams = {
  RequestItems: {
    [PRODUCTS_TABLE]: productBatchWriteRequests,
  },
};