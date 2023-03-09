import { useState, useEffect } from "react";
import { MantineProvider, Container, Flex, Center, ActionIcon } from "@mantine/core";
import { useMediaQuery, useLocalStorage } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { TbApple, TbArrowBackUp, TbBottle, TbCup, TbFish, TbGlass, TbIceCream, TbMeat, TbMicrowave, TbMilk, TbPizza, TbPlant, TbVaccineBottle } from "react-icons/tb";
import { FaPoop, FaWineBottle } from "react-icons/fa"
import { BsCupHot, BsCupStraw, BsEgg } from "react-icons/bs"
import { GiAlmond, GiBabyBottle, GiBeerBottle, GiBrandyBottle, GiBread, GiBubblingBowl, GiButter, GiButterToast, GiChickenLeg, GiChocolateBar, GiClothJar, GiCoffeeBeans, GiCoolSpices, GiCroissant, GiFrenchFries, GiHamburger, GiHamShank, GiHoneyJar, GiKetchup, GiMasonJar, GiMeat, GiMilkCarton, GiPlantSeed, GiPotato, GiSpiralBottle, GiSquareBottle, GiWrappedSweet } from "react-icons/gi"
import { SiShell } from "react-icons/si"
import { CiCoffeeBean } from "react-icons/ci"
import { BiBowlHot, BiCheese, BiCookie } from "react-icons/bi"
import { CgMenuCake } from "react-icons/cg"
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import "./App.css";

const today = dayjs().startOf("day").toDate();

const emptyDateData = () => {
  return {
    breakfast: {
      didntEat: false,
      mealTime: "07:00",
      selectedFood: []
    },
    lunch: {
      didntEat: false,
      mealTime: "12:00",
      selectedFood: []
    },
    dinner: {
      didntEat: false,
      mealTime: "18:00",
      selectedFood: []
    }
  };
};

const foodMenuItems = [
  {
    header: "Drink",
    content: [
      { label: "Water", Icon: TbBottle },
      { label: "Fruit Juice", Icon: TbVaccineBottle },
      { label: "Carb Drinks", Icon: BsCupStraw },
      { label: "Tea/Coffee", Icon: TbCup },
      { label: "Herb Tea", Icon: BsCupHot },
      { label: "Fuzzy Drinks 0%", Icon: GiBrandyBottle },
      { label: "Alcohol", Icon: TbGlass }
    ],
    color: "pink.4"
  },
  {
    header: "Proteins",
    content: [
      { label: "White Meat", Icon: GiChickenLeg },
      { label: "Red Meat", Icon: TbMeat },
      { label: "Shellfish", Icon: SiShell },
      { label: "Fish", Icon: TbFish },
      { label: "Ham", Icon: GiMeat },
      { label: "Egg", Icon: BsEgg },
      { label: "Delicatessen", Icon: GiHamShank },
      { label: "Soja Tofu", Icon: GiButter }
    ],
    color: "red.5"
  },
  {
    header: "Starches",
    content: [
      { label: "Bread", Icon: GiBread },
      { label: "Cereals", Icon: GiBubblingBowl },
      { label: "Potatoes", Icon: GiPotato },
      { label: "Dried Vegetables", Icon: GiCoffeeBeans },
      { label: "Chips/Fries", Icon: GiFrenchFries }
    ],
    color: "orange.4"
  },
  {
    header: "Fat",
    content: [
      { label: "Butter", Icon: GiButterToast },
      { label: "Oil", Icon: GiBeerBottle },
      { label: "Cream", Icon: FaPoop },
      { label: "Mayonnaise", Icon: FaWineBottle }
    ],
    color: "yellow.3"
  },
  {
    header: "Prepared Meal",
    content: [
      { label: "Pizza", Icon: TbPizza },
      { label: "Burger", Icon: GiHamburger },
      { label: "Lasagne", Icon: CgMenuCake },
      { label: "Completed Meals", Icon: TbMicrowave }
    ],
    color: "lime.3"
  },
  {
    header: "Fruits and Vegetables",
    content: [
      { label: "Vegetables", Icon: GiPlantSeed },
      { label: "Raw Vegetables", Icon: TbPlant },
      { label: "Fruits", Icon: TbApple },
      { label: "Soup", Icon: BiBowlHot },
      { label: "Compote", Icon: GiMasonJar }
    ],
    color: "green.5"
  },
  {
    header: "Dairy Products",
    content: [
      { label: "Dairy Products", Icon: GiMilkCarton },
      { label: "Cheese", Icon: BiCheese },
      { label: "Vegetal Milk", Icon: TbMilk }
    ],
    color: "cyan.3"
  },
  {
    header: "Sweet",
    content: [
      { label: "Jam", Icon: GiHoneyJar },
      { label: "Crackers", Icon: BiCookie }
    ],
    color: "blue.5"
  },
  {
    header: "Extras",
    content: [
      { label: "Chocolate", Icon: GiChocolateBar },
      { label: "Ice cream", Icon: TbIceCream },
      { label: "Pastries", Icon: GiWrappedSweet },
      { label: "Sweets", Icon: GiCroissant },
      { label: "Nutella", Icon: GiClothJar }
    ],
    color: "indigo.6"
  },
  {
    header: "Others",
    content: [
      { label: "Supplements", Icon: GiBabyBottle },
      { label: "Nuts/Olives", Icon: GiAlmond },
      { label: "Dried Fruits", Icon: CiCoffeeBean },
      { label: "Ketchup", Icon: GiKetchup },
      { label: "Soy sauce", Icon: GiSquareBottle },
      { label: "Mustard", Icon: GiSpiralBottle },
      { label: "Spices", Icon: GiCoolSpices }
    ],
    color: "grape.6"
  }
];

function App() {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [page, setPage] = useState(0);
  const [selectedDateObject, setSelectedDateObject] = useState({
    date: today,
    data: JSON.parse(localStorage.getItem("big-d"))?.dates[today] || emptyDateData()
  });
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [bigD, setBigD] = useLocalStorage({
    key: "big-d",
    defaultValue: JSON.parse(localStorage.getItem("big-d")) || { // this is stupid, shouldn't happen
      dates: {
        [selectedDateObject.date]: selectedDateObject.data
      },
      imgs: {
        breakfast: {
          url: ""
        },
        lunch: {
          url: ""
        },
        dinner: {
          url: ""
        }
      }
    }
  });
  
  const pageList = [
    <Page1
      isMobile={isMobile}
      setPage={setPage}
      selectedDateObject={selectedDateObject}
      setSelectedDateObject={setSelectedDateObject}
      setSelectedMeal={setSelectedMeal}
      bigD={bigD}
      setBigD={setBigD}
      foodMenuItems={foodMenuItems}
    />,
    <Page2
      isMobile={isMobile}
      selectedDateObject={selectedDateObject}
      setSelectedDateObject={setSelectedDateObject}
      selectedMeal={selectedMeal}
      foodMenuItems={foodMenuItems}
    />
  ];

  // useEffect(() => {
  //   console.log(bigD);
  // }, [bigD])

  useEffect(() => {
    setBigD({
      ...bigD,
      dates: {
        ...bigD.dates,
        [selectedDateObject.date]: selectedDateObject.data
      }
    });
  }, [selectedDateObject]);

  return (
    <div className="app">
      <div className="background">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div style={{ position: "relative" }}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "'Work Sans', sans-serif",
            components: {
              Container: {
                styles: {
                  root: {
                    padding: 0
                  }
                }
              }
            }
          }}
        >
          <Container
            h="10vh"
            fluid
            sx={{ backgroundColor: "hsl(240, 41%, 42%, 0.6)" }}
          >
            {page !== 0
              ? <Flex h="10vh" p={0} ml="md" align="center" sx={{ position: "absolute" }}>
                <ActionIcon
                  size={isMobile ? "3rem" : "5rem"}
                  color="gray.0"
                  variant="subtle"
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "hsl(240, 41%, 42%)"
                    }
                  }}
                  onClick={() => {
                    setSelectedMeal(null);
                    setPage(page - 1);
                  }}
                >
                  <TbArrowBackUp size={isMobile ? "3rem" : "5rem"} />
                </ActionIcon>
              </Flex>
              : ""
            }
            <Center h="100%">
              <DatePickerInput
                size={isMobile ? "md" : "xl"}
                defaultValue={today}
                value={selectedDateObject.date}
                onChange={value => {
                  setSelectedDateObject({ date: value, data: bigD.dates[value] || emptyDateData() });
                }}
                styles={{
                  input: {
                    backgroundColor: "#11ffee00",
                    borderColor: "#11ffee00",
                    border: 0,
                    color: "white",
                    fontSize: isMobile ? "1.5rem" : "2rem",
                    transition: "0.3s",
                    "&:hover": {
                      color: "hsl(240, 41%, 42%)",
                      backgroundColor: "white"
                    }
                  }
                }}
              />
            </Center>
          </Container>
          {pageList[page]}
        </MantineProvider>
      </div>
    </div>
  );
}

export default App;