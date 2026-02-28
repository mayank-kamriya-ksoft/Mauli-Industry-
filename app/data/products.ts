export interface SubProduct {
  id: string;
  name: string;
  description: string;
  specs?: Record<string, string>[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  subProducts?: SubProduct[];
  specs?: Record<string, string>[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "shearing-blades",
    name: "Shearing Blades for Rolling Mill and Steel Plants",
    description:
      "Mauli Industries is the leader in the sector of Manufacturing of Shearing Blades. We are manufacturing and supplying the shearing blades in Pan India for different applications from two decades. The customer family is getting bigger and bigger and we are happy to share that we have retained the giant rolling mills customers till now and accommodating the new ones with an open arm. Their satisfaction is our key inspiration to develop more reliable and sustainable shearing blades.",
    imageUrl: "/images/products/shearing-blades.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Shear Blade" },
      { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
      { Particular: "Shape", Specifications: "Rectangular" },
      { Particular: "Application", Specifications: "Hot Shearing Operations" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Packaging Type", Specifications: "Wooden" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
    subProducts: [
      {
        id: "billet-bloom",
        name: "Shearing Blades - Billet and Bloom",
        description:
          "Mauli Shear blades is ultimate solution to the customer need. Our customised solutions w.r.t design and product specification keep us ahead in the field. The selection of proper chemical composition to owe the application need yields optimal combination of properties like hardness, toughness endurance with sustainable product life. For better shearing experience and considering the better life of blade, the blades are heat treated with digitalised heat treatment process. Mauli Hot Shear blades can withstand up to 1000⁰C temperature for shearing of various thickness.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shear Blade" },
          { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
          { Particular: "Shape", Specifications: "Rectangular" },
          { Particular: "Application", Specifications: "Hot Shearing Operations" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
          { Particular: "Packaging Type", Specifications: "Wooden" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "cold-shear",
        name: "Cold Shear Blades",
        description:
          "The top-notch design, development and research enable us to offer the wide range of solution in terms of shearing for different products like sheet metals, angles, channels etc. We offer onsite solution for the Standard or non-standard machines. Our team of experts provides customised solution for performance improvement, if required. We can offer Mauli Cold Shear blades up to 3000-4000 mm with different steel grades as per application.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shearing Blades-Cold" },
          { Particular: "Material", Specifications: "STD-Alloy Steel" },
          { Particular: "Application", Specifications: "Cold Shearing Operation" },
          { Particular: "Variety", Specifications: "Rectangular" },
          { Particular: "Finishing", Specifications: "STD" },
          { Particular: "Salient Features", Specifications: "Precise Machined, Hardened, Certified" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "end-length",
        name: "End Length Shear Blades",
        description:
          "The top-notch design, development and research enable us to offer the wide range of solution in terms of shearing for different products like sheet metals, angles, channels etc. We offer onsite solution for the Standard or non-standard machines. Our team of experts provides customised solution for performance improvement, if required.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shearing Blades-Cold" },
          { Particular: "Material", Specifications: "STD-Alloy Steel" },
          { Particular: "Application", Specifications: "Cold Shearing Operation" },
          { Particular: "Variety", Specifications: "Rectangular" },
          { Particular: "Finishing", Specifications: "STD" },
          { Particular: "Salient Features", Specifications: "Precise Machined, Hardened, Certified" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "scrap-shear",
        name: "Scrap Shear Blades",
        description:
          "Mauli Shear blades is ultimate solution to the customer need. Our customised solutions w.r.t design and product specification keep us ahead in the field. The selection of proper chemical composition to owe the application need yields optimal combination of properties like hardness, toughness endurance with sustainable product life.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shear Blade" },
          { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
          { Particular: "Shape", Specifications: "Rectangular" },
          { Particular: "Application", Specifications: "Hot and Cold Shearing Operations" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
          { Particular: "Packaging Type", Specifications: "Wooden" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "bar-wire-rod",
        name: "Bar/Wire Rod Shear Blades",
        description:
          "Mauli Shear blades is ultimate solution to the customer need. Our customised solutions w.r.t design and product specification keep us ahead in the field. The selection of proper chemical composition to owe the application need yields optimal combination of properties like hardness, toughness endurance with sustainable product life. For better shearing experience and considering the better life of blade, the blades are heat treated with digitalised heat treatment process.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Shear Blade" },
          { Particular: "MOC", Specifications: "STD Alloy Tool Steel" },
          { Particular: "Shape", Specifications: "Rectangular" },
          { Particular: "Application", Specifications: "Hot and Cold Shearing Operations" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
          { Particular: "Packaging Type", Specifications: "Wooden" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "rotary-shear",
        name: "Rotary Shear Blade",
        description: "High-performance rotary shear blades for continuous cutting operations. Heat treated with digitalised process for better life and performance.",
      },
      {
        id: "flying-shear",
        name: "Flying Shear Blade",
        description: "Precision flying shear blades designed for high-speed cutting in rolling mills. Customised designs available.",
      },
      {
        id: "continuous-shear",
        name: "Continuous Shear Blade",
        description: "Blades designed for continuous shearing operations in rolling mills with sustained durability and performance.",
      },
      {
        id: "dividing-shear",
        name: "Dividing Shear Blade",
        description: "Specialized dividing shear blades for precision cutting of billets and blooms in steel plants.",
      },
      {
        id: "crank-shear",
        name: "Crank Shear Blade",
        description: "Heavy-duty crank shear blades engineered for reliable and consistent shearing operations.",
      },
      {
        id: "hot-shear",
        name: "Hot Shear Blade",
        description: "Hot shear blades designed for high-temperature shearing operations in rolling mills and steel plants. Heat treated with digitalised process for optimal performance.",
      },
      {
        id: "ccm-shear",
        name: "CCM Shear Blade",
        description: "CCM shear blades designed for continuous casting machine applications with high temperature resistance.",
      },
      {
        id: "coble-shear",
        name: "Coble Shear Blade",
        description: "Coble shear blades for specialized shearing applications in rolling mills, manufactured with precision and durability.",
      },
      {
        id: "angular-shear",
        name: "Angular Shear Blade",
        description: "Angular shear blades for angled cutting operations, available in customised designs and specifications.",
      },
      {
        id: "lubes-scanner",
        name: "Lubes Scanner Shear Blade",
        description: "Lubes scanner shear blades for specialized scanning and shearing applications in steel plants.",
      },
      {
        id: "chopping-shear",
        name: "Chopping Shear Blade",
        description: "Chopping shear blades for scrap and billet chopping applications in rolling mills.",
      },
      {
        id: "snap-shear",
        name: "Snap Shear Blade",
        description: "Snap shear blades for quick-action cutting operations in steel plants and rolling mills.",
      },
      {
        id: "box-shear",
        name: "Box Shear Blade",
        description: "Box type shear blades for heavy-duty shearing applications in steel rolling mills.",
      },
      {
        id: "pprm",
        name: "PPRM Blade",
        description: "PPRM blades for specialized rolling mill applications with precision machining and hardening.",
      },
      {
        id: "alligator-shear",
        name: "Alligator Shear Blade",
        description: "Alligator shear blades for scrap cutting and recycling operations, built for durability.",
      },
    ],
  },
  {
    id: "pinch-roll",
    name: "Pinch Roll and Tail Breaker",
    description:
      "Mauli is pioneer in the region of manufacturing the spare parts and machineries in rolling mills since last 20 years with happy and satisfactory customers. We have the innovative approach in product development for best performance and durability. We are expert in producing the high-speed pinch rolls and tail breaker to produce consistent tension of the bar.",
    imageUrl: "/images/products/Pinch-Roll-&-taol-breaker-unit.jpg",
  },
  {
    id: "mill-stands",
    name: "Mill Stands",
    description:
      "We are leading manufacturer of complete set of mill stands for the rolling industry of ferrous and non-ferrous metals.",
    imageUrl: "/images/products/Mill-stand.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Mill Stand" },
      { Particular: "MOC", Specifications: "MS or CI" },
      { Particular: "Shape", Specifications: "Designed" },
      { Particular: "Application", Specifications: "Shearing Operations" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Bearing", Specifications: "Spherical or Gun Bush" },
      { Particular: "Housing", Specifications: "Each Stands having Steel chocks" },
      { Particular: "Packaging Type", Specifications: "Wooden" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "gear-couplings",
    name: "Gear Couplings",
    description:
      "Proper material selection, adequate design and precision manufacturing is the basic key to develop an efficient gear coupling. They are generally used for transmitting the power from one shaft to another. Our quality control measure makes us to stand distinct in the line. We are the leading supplier of gear coupling for different sizes and torque requirement.",
    imageUrl: "/images/products/GEAR-Coupings.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Gear Coupling" },
      { Particular: "MOC", Specifications: "STD" },
      { Particular: "Shape", Specifications: "Customized" },
      { Particular: "Application", Specifications: "Shearing Operations" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Alignment", Specifications: "Able to handle radial and axial misalignment" },
      { Particular: "Speed", Specifications: "Rated speed" },
      { Particular: "Torque", Specifications: "Rated torque" },
      { Particular: "Torque Capacity", Specifications: "Can be used for high torque" },
      { Particular: "Packaging Type", Specifications: "Wooden" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
    subProducts: [
      {
        id: "roller-entry-guide-box",
        name: "Roller Entry Guide Box",
        description:
          "Guide box for roller is an integral part in rolling operation for rolling and twisting the stock in the adjacent set of rollers. Mauli Roller guide box gives you the credibility to attain the quality standard, durability and advances the smooth working operation. We are the market leader in providing sustainable and heavy-duty roller guide box and twisting pipe in the segment.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box and Twist Pipe" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Shape", Specifications: "Customized" },
          { Particular: "Application", Specifications: "Shearing Operations" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Alignment", Specifications: "Able to handle radial and axial misalignment" },
          { Particular: "Speed", Specifications: "Rated speed" },
          { Particular: "Torque", Specifications: "Rated torque" },
          { Particular: "Torque Capacity", Specifications: "Can be used for high torque" },
          { Particular: "Packaging Type", Specifications: "Wooden" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "roller-mill-entry-guide",
        name: "Roller Mill Entry Guide",
        description:
          "Precision roller mill entry guides designed for smooth stock entry into the rolling mill stands. Built for durability and consistent performance in rolling operations.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box and Twist Pipe" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Shape", Specifications: "Customized" },
          { Particular: "Application", Specifications: "Shearing Operations" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "roller-guide-boxes-without-holder",
        name: "Roller Guide Boxes Without Holder",
        description:
          "Standalone roller guide boxes without holder for flexible integration into various rolling mill configurations. Customized designs available.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Application", Specifications: "Rolling Operation" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "entry-guiding-roller-boxes",
        name: "Entry Guiding Roller Boxes",
        description:
          "Entry guiding roller boxes for precise material guidance into rolling mill stands, ensuring quality output and smooth operation.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Application", Specifications: "Rolling Operation" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "ss-body-roller-guide-box",
        name: "SS Body Roller Guide Box",
        description:
          "Stainless steel body roller guide boxes offering superior corrosion resistance and extended service life in demanding rolling mill environments.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box" },
          { Particular: "MOC", Specifications: "Stainless Steel" },
          { Particular: "Application", Specifications: "Rolling Operation" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "industrial-roller-guide-box",
        name: "Industrial Roller Guide Box",
        description:
          "Heavy-duty industrial roller guide boxes built for high-volume rolling operations with maximum uptime and reliability.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Application", Specifications: "Rolling Operation" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "stainless-steel-roller-guide-box",
        name: "Stainless Steel Roller Guide Box",
        description:
          "Premium stainless steel roller guide boxes for applications requiring maximum corrosion resistance and longevity. Ideal for demanding rolling mill environments with exposure to heat and moisture.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box" },
          { Particular: "MOC", Specifications: "Stainless Steel" },
          { Particular: "Application", Specifications: "Rolling Operation" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "roller-guide-box-reel",
        name: "Roller Guide Box Reel",
        description:
          "We provide all types of guide box reel as per requirement. We have specially designed reels for sustaining the wear and tear conditions, mostly durable and well suited to all your need.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "Roller Guide Box Reel" },
          { Particular: "MOC", Specifications: "STD" },
          { Particular: "Shape", Specifications: "Customized" },
          { Particular: "Application", Specifications: "Roller Guide Box-Rolling Operation" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Hardness", Specifications: "55-60 HRC" },
          { Particular: "Speed", Specifications: "Rated speed" },
          { Particular: "Torque", Specifications: "Rated torque" },
          { Particular: "Packaging Type", Specifications: "Wooden" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
      {
        id: "ci-guides",
        name: "CI Guides",
        description:
          "We provide different set of CI guides to fulfil the client needs.",
        specs: [
          { Particular: "Brand", Specifications: "Mauli" },
          { Particular: "Category", Specifications: "CI Casting" },
          { Particular: "MOC", Specifications: "CI" },
          { Particular: "Shape", Specifications: "Customized" },
          { Particular: "Application", Specifications: "Rolling Mill" },
          { Particular: "Variety", Specifications: "Customised" },
          { Particular: "Packaging Type", Specifications: "Wooden" },
          { Particular: "Supply", Specifications: "PAN India" },
        ],
      },
    ],
  },
  {
    id: "electro-hydraulic-grabber",
    name: "Electro Hydraulic Grabber",
    description:
      "The electro-hydraulic grabber is an attachment for different elevation equipment run on electric supply. It is suitable for handling the materials like scraps, industrial and municipal waste etc.",
    imageUrl: "/images/products/electro-hydraulic-grabber.jpg",
    specs: [
      { Particular: "Model MI-SG-50", Specifications: "Max Lift: 5T, Volume: 0.5m³, Dead Wt: 2T, Motor: 15kW, Pressure: 180 Bar, Shells: 5" },
      { Particular: "Model MI-SG-100", Specifications: "Max Lift: 8T, Volume: 1m³, Dead Wt: 3.2T, Motor: 30kW, Pressure: 200 Bar, Shells: 6" },
      { Particular: "Model MI-SG-125", Specifications: "Max Lift: 8T, Volume: 1.25m³, Dead Wt: 3.4T, Motor: 30kW, Pressure: 200 Bar, Shells: 6" },
      { Particular: "Model MI-SG-150", Specifications: "Max Lift: 10T, Volume: 1.5m³, Dead Wt: 3.8T, Motor: 30kW, Pressure: 200 Bar, Shells: 6" },
      { Particular: "Model MI-SG-200", Specifications: "Max Lift: 12.5T, Volume: 2m³, Dead Wt: 5.4T, Motor: 37kW, Pressure: 200 Bar, Shells: 6" },
      { Particular: "Model MI-SG-250", Specifications: "Max Lift: 16T, Volume: 2.5m³, Dead Wt: 5.6T, Motor: 37kW, Pressure: 200 Bar, Shells: 6" },
    ],
  },
  {
    id: "cold-shear-machine",
    name: "Cold Shear Machine",
    description:
      "Cold shear machine is one of the most popular products of Mauli Industries. Our R&D experts, professional machinist made us possible to deliver best in class machine to satisfy your need. Mauli Cold Shear Machine offers efficient operation, durability and long life.",
    imageUrl: "/images/products/cold-shear-machine.jpg",
  },
  {
    id: "bearing-chokes",
    name: "Bearing Chokes",
    description:
      "To avoid the resistive forces and smooth rotational flow bearing is an integral part in rolling mill. And to house or hold the bearing in the dynamic atmosphere a housing is provided also called as rolling chock or bearing chock, mounted on roll stand. We provide all kinds of bearing chocks.",
    imageUrl: "/images/products/bearing-chokes.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Bearing Chock" },
      { Particular: "MOC", Specifications: "Steel Casting EN-8, Steel Casting, EN-9" },
      { Particular: "Shape", Specifications: "Customized" },
      { Particular: "Application", Specifications: "Rolling Mill" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Packaging Type", Specifications: "Wooden" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "hydraulic-cylinders",
    name: "Hydraulic Cylinders",
    description:
      "We are leading manufacturer of giant hydraulic cylinders required for furnace, scrap grabbing, pusher etc application for rolling mills. We also provide power packs, seals and other spare parts as per your requirement. We provide services for overhauling, maintenance and modification if required.",
    imageUrl: "/images/products/hydraulic-cylinders.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Category", Specifications: "Hydraulic Cylinders" },
      { Particular: "MOC", Specifications: "STD" },
      { Particular: "Shape", Specifications: "Customized" },
      { Particular: "Application", Specifications: "Rolling Mill" },
      { Particular: "Variety", Specifications: "Customised" },
      { Particular: "Capacity", Specifications: "15 to 40 Tonnes" },
      { Particular: "Packaging Type", Specifications: "Wooden" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "gear",
    name: "Gear",
    description:
      "Mauli industries is devoted to be partner in propelling the success boat of your company wherein the gear is an integral part of any machine to give the required thrust. We, Mauli Industries is dedicated to provide you all types of gear and make the motion of all your need smooth and trouble free.",
    imageUrl: "/images/products/gear.jpg",
    subProducts: [
      {
        id: "worm-and-worm-wheel",
        name: "Worm and Worm Wheel",
        description:
          "Mauli Industries is the leading worm gear manufacturer, supplier and exporter in India. We are firm in offering the best quality worm gears all throughout India as well as many other countries spread across the world. We never compromise in the quality aspect of worm gears. We provide fully furnished products that are fabricated from top graded raw materials. Worm gears are highly utilized in the manufacturing and packaging industries. They are used in packing equipment, conveying applications and small machineries. We never compromise in the product quality. We've made stringent supervisions during the construction of superior grade worm gear. Worm gears are highly recommended due to their high tensile strength and great workability features.",
        specs: [
          { Particular: "Worms-Milled", Specifications: "Module: Min 1mm, Max 16mm | Diameter: Min 5mm, Max 1600mm" },
          { Particular: "Worms-Hardened & Ground", Specifications: "Module: Min 1mm, Max 16mm | Diameter: Min 5mm, Max 1600mm" },
          { Particular: "Worm Wheels", Specifications: "Module: Min 1mm, Max 16mm | Diameter: Min 5mm, Max 1600mm" },
        ],
      },
      {
        id: "spiral-bevel-gear",
        name: "Spiral Bevel Gear",
        description:
          "We are the leading Bevel gear manufacturer, opted all kind of bevel gears such as Ground Spiral Bevel Gear, Hard Cut Spiral Bevel Gear, Lapped Spiral Bevel Gear, Ground Straight Bevel Gear, Straight Bevel Gear, Hypoid Gear, Angular Bevel Gear, zero Bevel gear.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 1mm, Max 6mm" },
          { Particular: "Outside Diameter", Specifications: "Min 20mm, Max 280mm" },
        ],
      },
      {
        id: "straight-bevel-gear",
        name: "Straight Bevel Gear",
        description:
          "High-quality straight bevel gears with precision manufacturing for smooth power transmission in industrial applications.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 1mm, Max 8mm" },
          { Particular: "Outside Diameter", Specifications: "Min 12mm, Max 300mm" },
        ],
      },
      {
        id: "helical-gears-hob-finish",
        name: "Helical Gears - Hob Finish",
        description:
          "Our wide range and versatility to provide customized solution to your need. Hob finished helical gears for smooth and efficient operation.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 1mm, Max 16mm" },
          { Particular: "Outside Diameter", Specifications: "Min 5mm, Max 1600mm" },
        ],
      },
      {
        id: "helical-gears-hardened-ground",
        name: "Helical Gears - Hardened & Precision Ground",
        description:
          "Hardened and precision ground helical gears for demanding applications requiring high accuracy and durability.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 1mm, Max 16mm" },
          { Particular: "Outside Diameter", Specifications: "Min 5mm, Max 1600mm" },
        ],
      },
      {
        id: "spur-gear-hob-finish",
        name: "Spur Gear - Hob Finish",
        description:
          "Our wide range and versatility to provide customized solutions to your need. Available in various modules and diameters.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 0.5mm, Max 16mm" },
          { Particular: "Outside Diameter", Specifications: "Min 5mm, Max 1600mm" },
        ],
      },
      {
        id: "spur-gears-hardened-ground",
        name: "Spur Gears - Hardened & Precision Ground",
        description:
          "Hardened and precision ground spur gears for high-performance applications requiring superior surface finish.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 0.5mm, Max 16mm" },
          { Particular: "Outside Diameter", Specifications: "Min 5mm, Max 1600mm" },
        ],
      },
      {
        id: "spur-gears-shaped-external",
        name: "Spur Gears - Shaped (External)",
        description:
          "Externally shaped spur gears manufactured with precision for reliable power transmission in various industrial setups.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 0.5mm, Max 16mm" },
          { Particular: "Outside Diameter", Specifications: "Min 5mm, Max 1600mm" },
        ],
      },
      {
        id: "spur-gears-shaped-internal",
        name: "Spur Gears - Shaped (Internal)",
        description:
          "Internally shaped spur gears for specialized applications requiring internal gear configurations.",
        specs: [
          { Particular: "Normal Module", Specifications: "Min 0.5mm, Max 16mm" },
          { Particular: "Outside Diameter", Specifications: "Min 5mm, Max 1600mm" },
        ],
      },
    ],
  },
  {
    id: "chain-sprocket",
    name: "Chain Sprocket",
    description:
      "To give motion to the power that your company wants to give to integrate the success, we are here to present one of the bestseller products in the market for different industrial applications. Our products are manufactured with top notch design, material and manufacturing experts. We provide customised solution with the range includes single strand sprocket, double-strand sprocket, triple strand sprocket, Quadruplex, taper lock sprocket, split sprocket, countershaft sprocket, conveyor sprocket, roll mill sprockets, ring sprocket and many more.",
    imageUrl: "/images/products/chain-sprocket.jpg",
    specs: [
      { Particular: "Type", Specifications: "Chain Sprockets" },
      { Particular: "Normal Pitch", Specifications: "Min 5mm, Max 76mm" },
      { Particular: "Outside Diameter", Specifications: "Min 10mm, Max 1200mm" },
    ],
  },
  {
    id: "timing-pulley",
    name: "Timing Pulley",
    description:
      "Our precision manufacturing experts provides ultimate solution to ensure smooth and silent functioning of the drive. We offer multiple options of materials including ferrous and non-ferrous materials such as Steel, Aluminium and its alloys, CI, SS etc. We ensure the quality and cost effectiveness factor to serve you better.",
    imageUrl: "/images/products/timing-pulley.jpg",
    specs: [
      { Particular: "Type", Specifications: "Timing Belt Pulleys" },
      { Particular: "Minimum Diameter", Specifications: "10mm" },
      { Particular: "Maximum Diameter", Specifications: "600mm" },
    ],
  },
  {
    id: "gear-coupling",
    name: "Gear Coupling",
    description:
      "We have gear coupling served multiple sectors in PAN India in different sectors like Steel and rolling mill, Automotive, Tyre, Pharmaceutical Industries etc. Our gear coupling can be used to couple different power transmission parts enhances efficiency and accommodate the misalignment too. We have maintained the quality standards as per ISO 9001-2015.",
    imageUrl: "/images/products/gear-coupling.jpg",
    specs: [
      { Particular: "Gear Coupling (Full Crowning)", Specifications: "Module: 1mm, Diameter: Min 10mm, Max 500mm" },
      { Particular: "Gear Coupling Sleeves (I.D)", Specifications: "Module: 1mm, Diameter: Min 10mm, Max 650mm" },
    ],
  },
  {
    id: "helical-gearbox-crane",
    name: "Helical Gearboxes for Cranes",
    description:
      "Mauli is leading supplier and service provider of helical gearbox for crane. Our highly skilled human force and latest technology to map and provide you the best gearbox for all your need. Our dedicated research and development team kaizen's the quality and smoothen the motive force of your system. We have earnt faith from our esteemed client and created monopoly in the region for providing the best gearboxes in segment.",
    imageUrl: "/images/products/helical-gearbox-crane.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Stages", Specifications: "3 and 4" },
      { Particular: "MOC", Specifications: "STD Alloy Steel, Case Hardened Steel" },
      { Particular: "Shape", Specifications: "Customized" },
      { Particular: "Sizes", Specifications: "Upto 1200 mm Central Distance" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Ratio", Specifications: "630:1" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "parallel-shaft-gearbox",
    name: "Parallel Shaft Helical Gearboxes",
    description:
      "Mauli Industry is a top player among the parallel shaft helical gearboxes manufactures. Parallel Shaft Helical Gearboxes in single, two, three & four stages upto 630 CD at final stages.",
    imageUrl: "/images/products/parallel-shaft-gearbox.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Stages", Specifications: "Single-Fourth Stage helical" },
      { Particular: "MOC", Specifications: "STD Alloy Steel, Case Hardened Steel" },
      { Particular: "Shape", Specifications: "Customized" },
      { Particular: "Sizes", Specifications: "Upto 630 mm CD" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Ratio", Specifications: "Upto 650:1" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "extruder-gearbox",
    name: "Extruder Duty Helical Gearboxes",
    description:
      "Mauli Industries is well known for developing heavy duty, durable and less noise extruder gearbox accelerates efficiency and performance of the system. Our high capacity infra and expertise personnel made us market distinguisher in the competent marketplace. We can match your expectation with the best and customised gearboxes. We provide gearboxes in all kinds of process and product industries such as Iron and steel industries, food and beverage, pharmaceutical, tyre etc.",
    imageUrl: "/images/products/extruder-gearbox.jpg",
    specs: [
      { Particular: "Brand", Specifications: "Mauli" },
      { Particular: "Stages", Specifications: "1 and 2 Stage helical" },
      { Particular: "MOC", Specifications: "STD Alloy Steel, Case Hardened Steel" },
      { Particular: "Shape", Specifications: "Customized" },
      { Particular: "Sizes", Specifications: "Upto 630 mm CD" },
      { Particular: "Salient Feature", Specifications: "Precise Machined, Hardened, Certified" },
      { Particular: "Ratio", Specifications: "Upto 6:1 to 22:1" },
      { Particular: "Supply", Specifications: "PAN India" },
    ],
  },
  {
    id: "custom-gearbox",
    name: "Custom-Made Gear Boxes",
    description:
      "Mauli Industries drives the best solutions in customised helical gearbox manufacturing in India. We have a wide range of customers in different segments such as rolling mill, steel and power plants, pharmaceutical, automotive industries etc. We are the first choice in our region for providing the solutions for gearbox supply and service. Our highly skilled human force and latest technology to map and provide you the best gearbox for all your need. Our dedicated research and development team kaizen's the quality and smoothen the motive force of your system.",
    imageUrl: "/images/products/custom-gearbox.jpg",
  },
    {
    id: "SSINDUSTRIAL STEP LEADER",
    name: "SS Industrial Step Leader",
    description:
      "",
    imageUrl: "/images/products/step-leader.png",
  },
  {
    id: "SSCLOSETYPESCOOP",
    name: "SS Close Type Scoop",
    description:
      "",
    imageUrl: "/images/products/close-type-scoop.png",
  },
   {
    id: "SSMOPPIGTROLLEY",
    name: "SS Moppi G Trolley",
    description:
      "",
    imageUrl: "/images/products/moppi-g-trolley.png",
  },
  {
    id: "ss-dustbins",
    name: "SSDUSTBINS",
    description: "",
    imageUrl: "/images/products/ss-dustbins.jpg",
  },
  {
    id: "ss-stools",
    name: "SSSTOOLS",
    description: "",
    imageUrl: "/images/products/ss-stools.jpg",
  },
  {
    id: "ss-jugs",
    name: "SSJUGS",
    description: "",
    imageUrl: "/images/products/ss-jugs.jpg",
  },
  {
    id: "ss-zero-dead-leg-valve",
    name: "SS ZERO DEAD LEG VALVE",
    description: "",
    imageUrl: "/images/products/ss-zero-dead-leg-valve.jpg",
  },
  {
    id: "ss-bucket",
    name: "SSBUCKET",
    description: "",
    imageUrl: "/images/products/ss-bucket.jpg",
  },
  {
    id: "ss-chairs",
    name: "SSCHAIRS",
    description: "",
    imageUrl: "/images/products/ss-chairs.jpg",
  },
  {
    id: "ss-powder-samplers",
    name: "SSPOWDER SAMPLERS",
    description: "",
    imageUrl: "/images/products/ss-powder-samplers.jpg",
  },
  {
    id: "ss-teflon-hammer",
    name: "SSTEFLON HAMMER",
    description: "",
    imageUrl: "/images/products/ss-teflon-hammer.jpg",
  },
  {
    id: "BAGFILTERHOUSING",
    name: "Bag Filter Housing",
    description:
      "",
    imageUrl: "/images/products/bag-filter-housing.png",
  },
  {
    id: "ss-sopstand",
    name: "SSSOPSTAND",
    description: "",
    imageUrl: "/images/products/ss-sopstand.jpg",
  },
  {
    id: "ss-filter-housing",
    name: "SSFILTERHOUSING",
    description: "",
    imageUrl: "/images/products/ss-filter-housing.jpg",
  },
  {
    id: "electrical-vent-housing",
    name: "ELECTRIALVENTHOUSING",
    description: "",
    imageUrl: "/images/products/electrical-vent-housing.jpg",
  },
  {
    id: "ss-dustbins",
    name: "SSDUSTBINS",
    description: "",
    imageUrl: "/images/products/ss-dustbins.jpg",
  },
  {
    id: "ss-stools",
    name: "SSSTOOLS",
    description: "",
    imageUrl: "/images/products/ss-stools.jpg",
  },
  {
    id: "ss-jugs",
    name: "SSJUGS",
    description: "",
    imageUrl: "/images/products/ss-jugs.jpg",
  },
  {
    id: "ss-zero-dead-leg-valve",
    name: "SS ZERO DEAD LEG VALVE",
    description: "",
    imageUrl: "/images/products/ss-zero-dead-leg-valve.jpg",
  },
  {
    id: "loop-valve",
    name: "LOOP VALVE",
    description: "",
    imageUrl: "/images/products/loop-valve.jpg",
  },
  {
    id: "diaphgram-valve",
    name: "DIAPHGRAM VALVE",
    description: "",
    imageUrl: "/images/products/diaphgram-valve.jpg",
  },
  {
    id: "sampling-valve",
    name: "SAMPLING VALVE",
    description: "",
    imageUrl: "/images/products/sampling-valve.jpg",
  },
  {
    id: "flow-diverter-valve",
    name: "FLOW DIVERTER VALVE",
    description: "",
    imageUrl: "/images/products/flow-diverter-valve.jpg",
  },
  {
    id: "ball-valve",
    name: "BALL VALVE",
    description: "",
    imageUrl: "/images/products/ball-valve.jpg",
  },
  {
    id: "ss-bucket",
    name: "SSBUCKET",
    description: "",
    imageUrl: "/images/products/ss-bucket.jpg",
  },
  {
    id: "ss-chairs",
    name: "SSCHAIRS",
    description: "",
    imageUrl: "/images/products/ss-chairs.jpg",
  },
  {
    id: "ss-powder-samplers",
    name: "SSPOWDER SAMPLERS",
    description: "",
    imageUrl: "/images/products/ss-powder-samplers.jpg",
  },
  {
    id: "ss-teflon-hammer",
    name: "SSTEFLON HAMMER",
    description: "",
    imageUrl: "/images/products/ss-teflon-hammer.jpg",
  },
  {
    id: "ss-sopstand",
    name: "SSSOPSTAND",
    description: "",
    imageUrl: "/images/products/ss-sopstand.jpg",
  },
  {
    id: "ss-filter-housing",
    name: "SSFILTERHOUSING",
    description: "",
    imageUrl: "/images/products/ss-filter-housing.jpg",
  },
  {
    id: "electrical-vent-housing",
    name: "ELECTRIALVENTHOUSING",
    description: "",
    imageUrl: "/images/products/electrical-vent-housing.jpg",
  }
];
