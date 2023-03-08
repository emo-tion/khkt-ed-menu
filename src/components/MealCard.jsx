import { Paper, Group, Stack, Flex, Divider, ThemeIcon, Text, Button, FileButton, ActionIcon, ScrollArea } from "@mantine/core"
import { TbToolsKitchen2, TbPlus } from "react-icons/tb"

const imgToBase64 = img => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = error => reject(error);
  })
}

const MealCard = props => {
  return (
    <Paper w="70vw" h="20%" radius="lg" shadow="md" sx={{ overflow: "hidden" }}>
      <Group h="100%" spacing={0}>
        <Stack
          w="45%"
          h="100%"
          align="flex-start"
          spacing={0}
          sx={{ cursor: "pointer" }}
          onClick={event => {
            if (event.target === event.currentTarget ||
              (event.target.className.includes && event.target.className.includes("mantine-Group"))
            ) {
              props.setSelectedMeal(props.mealType);
              props.setPage(1);
            }
          }}
        >
          <Group h="45%" px="5%" align="center" spacing="md">
            <ThemeIcon
              size={props.isMobile ? "2rem" : "3.5rem"}
              radius="xl"
              color={{
                breakfast: "green.5",
                lunch: "cyan.5",
                dinner: "indigo.9"
              }[props.mealType]}
              variant="filled"
            >
              <TbToolsKitchen2 size={props.isMobile ? "1.5rem" : "2.5rem"} />
            </ThemeIcon>
            <Text
              fz={props.isMobile ? "1rem" : "1.5rem"}
              sx={{
                "&::first-letter": {
                  textTransform: "capitalize"
                }
              }}
            >
              {props.mealType}
            </Text>
          </Group>
          <ScrollArea w="100%" h="55%" scrollbarSize={6}>
            {/* aaaaaaaaaaaaaaaaaaaaaa */}
            <Group h="calc(90vh * 0.2 * 0.55)" px="calc(0.05 * 70vw * 0.45)" noWrap align="center" spacing="calc(0.05 * 70vw * 0.45)"> 
              {props.selectedDateObject.data[props.mealType].selectedFood.map((e, i) => {
                return (
                  <ActionIcon
                    key={i}
                    size={props.isMobile ? "2.7rem" : "4rem"}
                    radius="50%"
                    color={props.foodMenuItems[e[0]].color}
                    variant="filled"
                    onClick={() => {
                      let selectedFood = props.selectedDateObject.data[props.mealType].selectedFood;
                      selectedFood.splice(selectedFood.map(e => JSON.stringify(e)).indexOf(JSON.stringify([e[0], e[1]])), 1);
                      props.setSelectedDateObject({
                        ...props.selectedDateObject,
                        data: {
                          ...props.selectedDateObject.data,
                          [props.mealType]: {
                            ...props.selectedDateObject.data[props.mealType],
                            selectedFood: selectedFood
                          }
                        }
                      });
                    }}
                  >
                    {(() => {
                      const Icon = props.foodMenuItems[e[0]].content[e[1]].Icon;
                      return (
                        <Icon size={props.isMobile ? "2rem" : "2.8rem"} />
                      );
                    })()}
                  </ActionIcon>
                );
              })}
            </Group>
          </ScrollArea>
        </Stack>
        <Divider size="xs" orientation="vertical" color="gray.5" />
        <Flex
          h="100%"
          align="center"
          justify="flex-end"
          sx={{
            flex: 1,
            backgroundColor: "whitesmoke",
            backgroundImage: `url(${props.bigD.imgs[props.mealType].url})`,
            backgroundSize: "cover"
          }}
        >
          <FileButton
            mr="3%"
            px={10}
            color="gray"
            variant="subtle"
            accept="image/*"
            onChange={async value => {
              props.setBigD({
                ...props.bigD,
                imgs: {
                  ...props.bigD.imgs,
                  [props.mealType]: {
                    url: await imgToBase64(value)
                  }
                }
              });
            }}
          >
            {buttonProps =>
              <Button {...buttonProps}>
                <ThemeIcon mr={props.isMobile ? 5 : 8} size={props.isMobile ? "1.25rem" : "1.75rem"} radius="xl" color="gray" variant="outline">
                  <TbPlus />
                </ThemeIcon>
                <Text fz={props.isMobile ? "1rem" : "1.5rem"}>Add image</Text>
              </Button>
            }
          </FileButton>
        </Flex>
      </Group>
    </Paper>
  );
};

export default MealCard;